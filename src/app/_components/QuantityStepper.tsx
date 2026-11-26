import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type QuantityStepperProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  decreaseDisabled?: boolean;
  className?: string;
};

export default function QuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
  decreaseDisabled = false,
  className = "",
}: QuantityStepperProps) {
  return (
    <div
      className={twMerge(
        `inline-flex h-12 min-w-32 items-center justify-between rounded-2xl border-2 border-black bg-zinc-300 text-black`,
        className,
      )}
    >
      <button
        type="button"
        aria-label="Уменьшить кол-во"
        disabled={decreaseDisabled}
        onClick={onDecrease}
        className="grid w-10 h-10 place-items-center text-xl hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>
      <span className="min-w-8 text-center font-semibold tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Увеличить колво"
        onClick={onIncrease}
        className="grid w-10 h-10 place-items-center text-xl hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
