import QRCode from "qrcode";
import { Document } from "../models/document.model.js";

const uploadDocument = async (req, res) => {
  try {
    const file = req.file;

    const { title, expiryTime, uploadedBy } = req.body;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document",
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Document title is required",
      });
    }



    //const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
const fileUrl = `${process.env.SERVER_URL}/uploads/${file.filename}`;
    const qrCode = await QRCode.toDataURL(fileUrl, {
      width: 500,
      margin: 2,
    });

    const document = await Document.create({
      title,
      fileUrl,
      qrCode,
      expiryTime,
    });

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find()
      .populate("uploadedBy", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate(
      "uploadedBy",
      "username email",
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { uploadDocument, getAllDocuments, getDocumentById };
