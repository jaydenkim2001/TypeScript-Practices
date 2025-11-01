interface IPerson {
  name: string;
  age: number;
  gender: string;
}

interface IForeigner extends IPerson {
  nationality: string;
}

type TForeigner = IPerson & { nationality: string; period: Date };

let american: TForeigner = {
  name: "Greg",
  age: 23,
  gender: "M",
  nationality: "american",
  period: new Date(""),
};
