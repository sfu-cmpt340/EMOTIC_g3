type EmotionStyle = {
  textColor: string;
};

export enum Emotion {
  Anger = "Anger",
  Disgust = "Disgust",
  Fear = "Fear",
  Sadness = "Sadness",
  Neutral = "Neutral",
  Amusement = "Amusement",
  Inspiration = "Inspiration",
  Joy = "Joy",
  Tenderness = "Tenderness",
}

export const emotionStyles: Record<Emotion, EmotionStyle> = {
  [Emotion.Anger]: {
    textColor: "dark:text-negativeEmo-500 text-negativeEmo-700",
  },
  [Emotion.Disgust]: {
    textColor: "dark:text-negativeEmo-500 text-negativeEmo-700",
  },
  [Emotion.Fear]: {
    textColor: "dark:text-negativeEmo-500 text-negativeEmo-700",
  },
  [Emotion.Sadness]: {
    textColor: "dark:text-negativeEmo-500 text-negativeEmo-700",
  },
  [Emotion.Neutral]: {
    textColor: "dark:text-neutralEmo-500 text-neutralEmo-700",
  },
  [Emotion.Amusement]: {
    textColor: "dark:text-positiveEmo-500 text-positiveEmo-700",
  },
  [Emotion.Inspiration]: {
    textColor: "dark:text-positiveEmo-500 text-positiveEmo-700",
  },
  [Emotion.Joy]: {
    textColor: "dark:text-positiveEmo-500 text-positiveEmo-700",
  },
  [Emotion.Tenderness]: {
    textColor: "dark:text-positiveEmo-500 text-positiveEmo-700",
  },
};
