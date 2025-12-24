import { useState } from "react";
import { PageLayout } from "../../components/shared/PageLayout";
import { DrugSearchInput } from "../../components/shared/DrugSearchInput";
import { Trash2, Plus, Calculator, CheckCircle } from "lucide-react";
import { formatCurrency } from "../../utils/format";
import type { Drug } from "../../types";

interface CartItem {
  drug: Drug;
  quantity: number;
  price: number;
}

export const PharmacyPOS = () => {
  const [phone, setPhone] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutComplete, setCheckoutComplete] = useState<string | null>(null);

  const handleAddDrug = (drug: Drug) => {
    if (cart.find((i) => i.drug.id === drug.id)) return;
    setCart([...cart, { drug, quantity: 1, price: 0 }]);
  };

  const updateItem = (
    index: number,
    field: "quantity" | "price",
    value: number
  ) => {
    const newCart = [...cart];
    newCart[index] = { ...newCart[index], [field]: value };
    setCart(newCart);
  };

  const removeItem = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleCheckout = () => {
    // Logic would be:
    // 1. Validate phone
    // 2. Call createPurchase(phone, cart)
    // 3. Show Success

    const traceId = `TR-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
    setCheckoutComplete(traceId);
    setCart([]);
    setPhone("");
  };

  if (checkoutComplete) {
    return (
      <PageLayout title="Sale Complete">
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Purchase Recorded!
          </h2>
          <p className="text-gray-500 mb-6">
            Trace ID:{" "}
            <span className="font-mono font-medium text-gray-900">
              {checkoutComplete}
            </span>
          </p>
          <button
            onClick={() => setCheckoutComplete(null)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Sale
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Create Purchase (POS)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Phone */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Details
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+234..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Purchases will be linked to this phone number history.
              </p>
            </div>
          </div>

          {/* Add Drugs */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Items
            </h3>
            <DrugSearchInput
              onSelect={handleAddDrug}
              placeholder="Search drug master list..."
              className="mb-6"
            />

            {cart.length === 0 ? (
              <div className="text-center text-gray-400 py-12 border-2 border-dashed border-gray-100 rounded-xl">
                <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Search and add drugs to the cart</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div
                    key={item.drug.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl animate-in fade-in slide-in-from-bottom-2"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.drug.name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {item.drug.strength}
                      </span>
                    </div>

                    <div className="w-24">
                      <label className="text-xs text-gray-500 block mb-1">
                        Qty
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            idx,
                            "quantity",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-center"
                      />
                    </div>

                    <div className="w-32">
                      <label className="text-xs text-gray-500 block mb-1">
                        Price (₦)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(
                            idx,
                            "price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-right"
                      />
                    </div>

                    <button
                      onClick={() => removeItem(idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-5"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items Count</span>
                <span>{cart.reduce((a, b) => a + b.quantity, 0)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-gray-900 font-medium">Total Amount</span>
                <span className="text-3xl font-bold text-blue-600">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || totalAmount === 0 || !phone}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
            >
              Confirm Purchase
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Inventory will be updated automatically.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
