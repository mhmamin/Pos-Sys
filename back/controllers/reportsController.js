import Invoice from "../models/Invoice.js";

export const dailyReport = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const invoices = await Invoice.find({
      createdAt: { $gte: today },
    });

    const totalSales = invoices.reduce(
      (acc, inv) => acc + (inv.finalTotal || 0),
      0,
    );

    res.json({
      date: today,
      totalSales,
      count: invoices.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rangeReport = async (req, res) => {
  try {
    const { start, end } = req.body;
    if (!start || !end) {
      return res.status(400).json({ message: "برجاء تحديد التاريخ" });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    const invoices = await Invoice.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const total = invoices.reduce((acc, i) => acc + (i.finalTotal || 0), 0);

    res.json({
      invoices,
      total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const ropProducts = async (req, res) => {
  try {
    const data = await Invoice.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          count: { $sum: "$items.qty" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const weeklyReport = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const report = await Invoice.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: "$finalTotal" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedReport = report.map((item) => ({
      day: item._id,
      sales: item.sales || 0,
    }));

    res.json(formattedReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
