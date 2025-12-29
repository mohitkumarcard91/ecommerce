export default function ReviewCard({ product }) {
  if (!product?.reviews || product.reviews.length === 0) {
    return <p>No reviews available</p>;
  }

  return (
    <div className="space-y-4">
      {product.reviews.map((review, index) => (
        <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{review.reviewerName}</h3>
            <span className="text-yellow-500 font-medium">
              ⭐ {review.rating}
            </span>
          </div>

          <p className="text-gray-600">{review.comment}</p>

          <p className="text-sm text-gray-400 mt-2">
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
