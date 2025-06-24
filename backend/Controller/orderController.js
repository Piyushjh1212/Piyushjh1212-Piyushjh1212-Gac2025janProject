const orderController = async (req, res) => {
  try {
    const {
      userId,
      courseId,
      amount,
      address,
      status,
      payment,
      razorpayOrder,
    } = req.body;

    if (
      !userId ||
      !courseId ||
      !amount ||
      !address ||
      !status ||
      !payment ||
      !razorpayOrder
    ) {
      return res.status(404).json({
        success: false,
        message: `All fields are required.`,
      });
    }

    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Api got error: ${error.name} - ${error.message}.`,
    });
  }
};
