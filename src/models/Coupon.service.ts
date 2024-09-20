import moment from "moment";
import couponModel from "../schema/couponModel";
import Errors from "../libs/Error";
import { Coupan, CoupanInput } from "../libs/types/coupan";
import { HttpCode } from "../libs/Error";
import { Message } from "../libs/Error";
import cron from "node-cron";
import * as bcrypt from "bcryptjs";
class CouponService {
  private readonly couponModel;

  constructor() {
    this.couponModel = couponModel;
    this.scheduleCouponCleanup();
  }

  public async createCoupon(input: CoupanInput) {
    try {
      const words = ["Fresh", "Savory", "Delicious", "Tasty", "Sweet"];
      let randomWords = [];
      for (let i = 0; i < 6; i++) {
        randomWords.push(words[Math.floor(Math.random() * words.length)]);
      }
      input.name = `Coupon-${randomWords.join("-")}`;
      const salt = await bcrypt.genSalt();
      input.name = await bcrypt.hash(input.name, salt);

      if (Number(input.discount) > 100) {
        throw new Error("Discount cannot exceed 100%");
      }

      return await this.couponModel.create(input);
    } catch (err) {
      console.error("Error in createCoupon:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async getAllCoupons(): Promise<Coupan[]> {
    const result = await this.couponModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  private async deleteExpiredCoupons() {
    try {
      const now = moment().startOf("day").toDate();
      await this.couponModel.deleteMany({ expiry: { $lt: now } });
    } catch (error) {
      console.error("Error removing expired coupons:", error);
    }
  }

  private scheduleCouponCleanup() {
    cron.schedule("0 0 * * *", () => {
      console.log("Running scheduled coupon cleanup.");
      this.deleteExpiredCoupons();
    });
  }
}

export default CouponService;