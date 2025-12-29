export default function Loading() {
  return (
    <button
      className="inline-block rounded-full border-2 border-indigo-500 text-rose-400 hover:bg-rose-400 hover:bg-opacity-10 hover:text-rose-600 focus:border-rose-700 focus:text-rose-700 active:border-rose-800 active:text-rose-800 dark:border-rose-300 dark:text-rose-300 dark:hover:hover:bg-rose-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
      type="button"
    >
      <div
        role="status"
        className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      Loading....
    </button>
  );
}
