import ServiceRequest from "../models/ServiceRequest.js";

/* CREATE */
export const createRequest = async (req, res) => {
  try {
    const newRequest = new ServiceRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: "Request submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL (Admin) */
export const getAllRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
export const deleteRequest = async (req, res) => {
  try {
    await ServiceRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Request deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
