// yha s sare kind of routes bananege okkh!..
// api/v1/auth aise wale!..

// inki api banani hai pehle sari okkh! todha tagda poject hai bhai ye isko complete kar hi diyo okkh! na

import express from "express";
import authRoutes from "./routes/auth.route";
import rideRoutes from "./routes/ride.routes";
import driverRoutes from "./routes/driver.routes";
import paymentRoutes from "./routes/payment.routes";

import cookieParser from "cookie-parser";

const app = express();
app.use(express());
app.use(cookieParser());

const port = process.env.PORT!;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ride", rideRoutes);
app.use("/api/v1/driver", driverRoutes);
app.use("/api/v1/payments", paymentRoutes);

app.listen((port) => {
  console.log("server are running on PORT", port);
});
