import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split

import tensorflow as tf

from sklearn.metrics import confusion_matrix, classification_report
import process

# preprocessing
def preprocessInputs(dataframe, labelMap):
    dataframe = dataframe.copy()	
   
    dataframe['label'] = dataframe['label'].map(labelMap) # replacing the labels with numbers

    # copying just the label column
    y = dataframe['label'].copy()
    x = dataframe.drop('label', axis=1).copy() # dropping just the label column

    # splitting the data into training and testing sets
    x_train, x_test, y_train, y_test = train_test_split(x, y, train_size=0.8, random_state=17)
    return x_train, x_test, y_train, y_test


# model
def buildModel(x_train, y_train):
    inputs = tf.keras.Input(shape=(x_train.shape[1],)) #the columns/features

    # gru layers require inputs to be 3D.
    reshaped = tf.keras.layers.Reshape((x_train.shape[1], 1))(inputs) #adding an extra dimension to the deptth dimension, making it 3D

    # Recurrent neural network: take in new input and previous output 
    #gated recurrent units tend to work better on smaller datasets. Using 32 units in the GRU for each of our examples
    # having return_sequences=True will return the output for each input, not just the last one as a 2D array. Improves performance.
    gated_recurrent_unit = tf.keras.layers.GRU(32, return_sequences=True)(reshaped)
    flatten = tf.keras.layers.Flatten()(gated_recurrent_unit)

    outputs = tf.keras.layers.Dense(9, activation='softmax')(flatten) # probability values for 9 classes: Anger, Disgust, Fear, Sadness, Neutral, Amusement, Inspiration, Joy, Tenderness. And softmax makes the probabilities such that they all add upto 1
    model = tf.keras.Model(inputs=inputs, outputs=outputs)
    print(model.summary())

    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy', # best for multiclass classification
        metrics=['accuracy']
    )

    # training and storing history
    history = model.fit(
        x_train,
        y_train,
        validation_split=0.2,
        batch_size=32,
        epochs=10,
        callbacks=[
            tf.keras.callbacks.EarlyStopping( # take a look at the validation loss after each epoch
                monitor='val_loss',
                patience=10, # check if the loss is improving for a number of epochs, 10 in our case, if not then stop the training and restore the best weights from the epochs
                restore_best_weights=True
            )
        ]
    )
    model.save("model.keras")
    return model, history

# Results
def results(model, history, x_test, y_test):
    model_loss, model_acc = model.evaluate(x_test, y_test, verbose=0) # returns loss and accuracy, for only accuracy get the val at index =1
    print("Test Accuracy: {:.3f}%".format(model_acc * 100)) # multiply by 100 to get percentage, and getting 3 decimal places
    print("Test Loss: {:.3f}%".format(model_loss))

    # model.predict will return multiple sets of 9 probability values, one for each class
    # np.max will give largest number within the 9 and np.argmax will give the location of the largest number
    # map will apply the lambda function to each element of the list, getting argmax of each set of 9 probabilities, which we turn into a list and then a numpy array
    y_pred = np.array(list(map(lambda x: np.argmax(x), model.predict(x_test))))

    # confusion matrix
    cm = confusion_matrix(y_test, y_pred)
    clr = classification_report(y_test, y_pred, target_names=labelMap.keys())

    plt.figure(figsize=(8, 8))
    # fmat='g' to make sure that the counts for the classification are not in scientific notation
    sns.heatmap(cm, annot=True, vmin=0, fmt='g', cbar=False, cmap='Blues') # min val=0, cbar=False to remove color bar, cmap=Blues for blue color
    plt.xticks(np.arange(9) + 0.5, labelMap.keys()) # setting the ticks at 0.5, 1.5, 2.5	and values as the keys of the labelMap
    plt.yticks(np.arange(9) + 0.5, labelMap.keys()) 
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('Confusion Matrix')
    plt.show()

    print("Classification Report:\n----------------------\n", clr)


# process the data
reshaped_eeg_data, labels = process.process_training_data()

# column names
eeg_columns = []
for i in range(reshaped_eeg_data.shape[1]):
    eeg_columns.append(f'eeg_{i}')
    
# Convert EEG data to DataFrame
eeg_df = pd.DataFrame(reshaped_eeg_data, columns=eeg_columns)
    
# Add labels
eeg_df['label'] = labels

labelMap = { 'Anger':	0, 'Disgust': 1, 'Fear': 2, 'Sadness': 3, 'Neutral': 4, 'Amusement': 5, 'Inspiration': 6, 'Joy': 7, 'Tenderness': 8 }	

# preprocess the inputs
x_train, x_test, y_train, y_test = preprocessInputs(eeg_df, labelMap)

# build the model
model, history = buildModel(x_train, y_train)

# test the model and get results
results(model, history, x_test, y_test)