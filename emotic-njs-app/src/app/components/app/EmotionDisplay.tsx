import { emotionStyles, Emotion } from "@/app/config/EmotionsConfig";

export default function EmotionDisplay({ emotion }: { emotion: Emotion }) {
  const { textColor } = emotionStyles[emotion];
  return (
    <div className={`p-4 rounded`}>
      <div className="flex text-2xl font-nunitoSans font-semibold dark:font-medium">
        <p>Predicted Emotion:&nbsp;</p>
        <p className={`${textColor}`}>{emotion}</p>
      </div>
    </div>
  );
}
