export default function FoodCard({ item }) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">

            {/* IMAGE */}
            <div className="overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                />
            </div>

            {/* CONTENT */}
            <div className="p-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>

                {/* PRICE + BUTTON */}
                <div className="flex justify-between items-center mt-4">
                    <span className="font-medium text-gray-800">
                        {item.price}
                    </span>

                    <button className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm hover:bg-orange-600 hover:scale-105 transition duration-200">
                        + Add
                    </button>
                </div>
            </div>
        </div>
    );
}