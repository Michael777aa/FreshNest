import { Request, Response } from "express";
import CouponService from "../models/Coupon.service";
import { T } from "../libs/types/common";
import { AdminRequest } from "../libs/types/member";
import Errors, { Message } from "../libs/Error";

const couponService = new CouponService();
const couponController: T = {};

couponController.getAllCoupons = async (req: Request, res: Response) => {
  try {
    console.log("getAllCoupons");
    const data = await couponService.getAllCoupons();
    res.render("Coupon", { coupons: data });
  } catch (err) {
    console.log("Error, getAllCoupons", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
couponController.createCoupon = async (req: AdminRequest, res: Response) => {
  try {
    await couponService.createCoupon(req.body);
    res.send(
      `<script> alert("Sucessfully creation!"); window.location.replace('/admin/coupanCreate');</script>`
    );
  } catch (err) {
    console.log("Error, createNewProduct", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}"); window.location.replace("/admin/coupanCreate")</script>`
    );
  }
};

export default couponController;