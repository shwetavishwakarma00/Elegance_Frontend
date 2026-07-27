import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_id, address_id, items, payment_method } = body;

    if (!user_id || !items || items.length === 0) {
      return Response.json({ error: "Invalid checkout payload" }, { status: 400 });
    }

    const orderNumber = `ELG-${Date.now()}`;
    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

    const orderResult = await query(
      `INSERT INTO orders (user_id, address_id, order_number, subtotal, total_amount, payment_status, order_status)
       VALUES (?, ?, ?, ?, ?, 'Pending', 'Pending')`,
      [user_id, address_id || null, orderNumber, subtotal, subtotal]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, variant_id, quantity, price, subtotal)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.variant_id || null, item.quantity, item.price, Number(item.price) * Number(item.quantity)]
      );
    }

    await query(
      `INSERT INTO payments (order_id, payment_method, payment_status, amount)
       VALUES (?, ?, 'Pending', ?)`,
      [orderId, payment_method || "COD", subtotal]
    );

    return Response.json({ success: true, orderId, orderNumber });
  } catch (error) {
    return Response.json(
      { error: error.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
