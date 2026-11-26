export default function Chip({ ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className="rounded-xl border border-zinc-300 px-4 py-1.5 aria-pressed:bg-zinc-800 aria-pressed:text-white disabled:cursor-not-allowed hover:bg-zinc-200/80 transition-colors disabled:bg-zinc-300 duration-400"
      {...props}
    />
  );
}
