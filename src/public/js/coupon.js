console.log(`Coupon expires on: ${couponExpiry}`);
function generateCouponName() {
  const randomName = "Coupon-" + Math.random().toString(36).substring(2, 8);
  document.getElementById("name").value = randomName;
}