import {
  IAllShips,
  IPoint,
  IShips,
  IShipsData,
  IShipsDetails,
} from "./store.interface";

export const startShipsData: IShipsData[] = [];

export const allShips: IAllShips[] = [];

export const addShipsData = (data: IShipsData) => {
  startShipsData.push(data);
};

export const addAllShipsData = (data: IAllShips) => {
  allShips.push(data);
};

export const createAllShipsData = (
  ships: IShipsDetails[],
  playerId: number
): IAllShips => ({
  playerId,
  ships,
});

export const createShip = (ship: IShips): IPoint[] => {
  const shipArray: IPoint[] = [];
  const shipLength = ship.length;
  let positionX = ship.position.x;
  let positionY = ship.position.y;

  for (let index = 0; index < shipLength; index += 1) {
    if (ship.direction) {
      const point: IPoint = {
        x: positionX,
        y: positionY + index,
      };
      shipArray.push(point);
    } else {
      const point: IPoint = {
        x: positionX + index,
        y: positionY,
      };
      shipArray.push(point);
    }
  }
  return shipArray;
};

export const createMissPoints = (ships: IPoint[]): IPoint[] => {
  let missArray: IPoint[] = [];

  ships.forEach((point) => {
    const x = point.x;
    const y = point.y;

    const leftTopPoint: IPoint = { x: x - 1, y: y - 1 };
    const middleTopPoint: IPoint = { x: x, y: y - 1 };
    const rightTopPoint: IPoint = { x: x + 1, y: y - 1 };

    const leftMiddlePoint: IPoint = { x: x - 1, y: y };
    const rightMiddlePoint: IPoint = { x: x + 1, y: y };

    const leftBottomPoint: IPoint = { x: x - 1, y: y + 1 };
    const middleBottomPoint: IPoint = { x: x, y: y + 1 };
    const rightBottomPoint: IPoint = { x: x + 1, y: y + 1 };

    missArray.push(
      leftTopPoint,
      middleTopPoint,
      rightTopPoint,
      leftMiddlePoint,
      rightMiddlePoint,
      leftBottomPoint,
      middleBottomPoint,
      rightBottomPoint
    );
  });

  ships.forEach((ship) => {
    const x = ship.x;
    const newMissArray = missArray.filter((point) => point.x !== x);
    missArray = newMissArray;
  });

  ships.forEach((ship) => {
    const y = ship.y;
    const newMissArray = missArray.filter((point) => point.y !== y);
    missArray = newMissArray;
  });

  missArray = missArray.filter((point) => point.x >= 0);
  missArray = missArray.filter((point) => point.y >= 0);

  return missArray;
};
