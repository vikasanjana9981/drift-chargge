
const SubscriptionProductFormSkeleton = () => {
  return (
    <div className="space-y-5 animate-pulse p-4 w-full">
      {/* Title */}
      <div className="h-5 w-1/3 bg-gray-200 rounded-md" />

      {/* Product Name */}
      <div className="space-y-1">
        <div className="h-4 w-1/4 bg-gray-300 rounded-md" />
        <div className="h-10 w-full bg-gray-100 rounded-md" />
      </div>

      {/* Variant Select */}
      <div className="space-y-1">
        <div className="h-4 w-1/4 bg-gray-300 rounded-md" />
        <div className="h-10 w-full bg-gray-100 rounded-md" />
      </div>

      {/* Variant Name */}
      <div className="space-y-1">
        <div className="h-4 w-1/4 bg-gray-300 rounded-md" />
        <div className="h-10 w-full bg-gray-100 rounded-md" />
      </div>

      {/* Quantity */}
      <div className="space-y-1">
        <div className="h-4 w-1/4 bg-gray-300 rounded-md" />
        <div className="h-10 w-full bg-gray-100 rounded-md" />
      </div>

      {/* Recurring Price */}
      <div className="space-y-1">
        <div className="h-4 w-1/4 bg-gray-300 rounded-md" />
        <div className="h-10 w-full bg-gray-100 rounded-md" />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        <div className="h-10 w-24 bg-gray-200 rounded-md" />
        <div className="h-10 w-24 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default SubscriptionProductFormSkeleton;
