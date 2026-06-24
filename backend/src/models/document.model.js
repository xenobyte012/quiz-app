import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema(
  {
    title: {
      type: String,

      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    qrCode: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expiryTime: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Document = mongoose.model("Document", documentSchema);
