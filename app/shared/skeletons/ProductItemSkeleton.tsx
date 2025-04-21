const ProductItemSkeleton = () => {
    return (
      <div
        role="status"
        className="flex justify-between items-center border p-3 rounded-md animate-pulse space-x-4 w-full"
      >
        {/* Left: Image */}
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-sm" />
  
        {/* Middle: Title + Info */}
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-40" />
        </div>
  
        {/* Right: Button */}
        <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded-sm" />
  
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  
  export default ProductItemSkeleton;
  