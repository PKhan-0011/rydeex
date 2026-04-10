import z from "zod";

export const createRideSchema = z.object({
  userId: z.number(),
  driverId: z.number(),
  pickUpLat: z.number(),
  pickUpLng: z.number(),
  dropLat: z.number(),
  dropLng: z.number(),
});
