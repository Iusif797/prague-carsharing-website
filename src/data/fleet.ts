export type FleetCar = {
  img: string;
  name: string;
  tag: string;
  range: string;
  seats: string;
  accel: string;
  price: string;
};

export const FLEET_CARS: FleetCar[] = [
  {
    img: "/fleet/bmw-i4.jpg",
    name: "BMW i4 eDrive40",
    tag: "Electric · Touring",
    range: "490 km",
    seats: "5",
    accel: "5.7s",
    price: "8 Kč / min",
  },
  {
    img: "/fleet/bmw-118i.jpg",
    name: "BMW 118i",
    tag: "Hatch · City",
    range: "620 km",
    seats: "5",
    accel: "8.5s",
    price: "5 Kč / min",
  },
  {
    img: "/fleet/bmw-x1.jpg",
    name: "BMW X1 sDrive20i",
    tag: "Crossover · Family",
    range: "700 km",
    seats: "5",
    accel: "7.4s",
    price: "7 Kč / min",
  },
];
