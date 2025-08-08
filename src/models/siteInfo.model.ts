import { ISiteInfo } from "@/interface/siteInfo.interface";
import mongoose, { Schema, model, models } from "mongoose";

const SiteInfoSchema: Schema = new Schema<ISiteInfo>(
  {
    number: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    logo: { type: String, required: true },

    banner: {
      carousel: [
        {
          image: { type: String },
          link: { type: String },
        },
      ],
      firstImage: {
        image: { type: String },
        link: { type: String },
      },
      secondImage: {
        image: { type: String },
        link: { type: String },
      },
    },

    socialContact: {
      facebook: { type: String, required: true },
      youtube: { type: String },
      instagrame: { type: String },
      linkedIn: { type: String },
      whatsApp: { type: String },
      twitter: { type: String },
    },

    addresses: [
      {
        name: { type: String, required: true },
        address: { type: String, required: true },
      },
    ],

    mapLink: { type: String, required: true },

    footerLinks: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

    marqueeText: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

type SiteInfoDocument = mongoose.HydratedDocument<ISiteInfo>;

SiteInfoSchema.pre<SiteInfoDocument>(
  "save",
  async function (
    this: SiteInfoDocument,
    next: mongoose.CallbackWithoutResultAndOptionalError
  ) {
    if (
      this.isModified("number") &&
      this.number &&
      !this.number.startsWith("+88")
    ) {
      this.number = this.number.startsWith("88")
        ? `+${this.number}`
        : `+88${this.number}`;
    }

    if (
      this.isModified("socialContact.whatsApp") &&
      this.socialContact?.whatsApp
    ) {
      const whatsapp = this.socialContact.whatsApp;
      if (!whatsapp.startsWith("+88")) {
        this.socialContact.whatsApp = whatsapp.startsWith("88")
          ? `+${whatsapp}`
          : `+88${whatsapp}`;
      }
    }

    const existing = await SiteInfo.findOne({});
    if (
      existing &&
      this._id &&
      existing._id.toString() !== this._id.toString()
    ) {
      await SiteInfo.deleteMany({ _id: { $ne: this._id } });
    }

    next();
  }
);

const SiteInfo =
  models.SiteInfo || model<ISiteInfo>("SiteInfo", SiteInfoSchema);

export default SiteInfo;
