import { ChangeEvent, useEffect, useState } from "react";
import ButtonCustomFilter from "./ButtonCustomFilter";

interface Props {
  onFileChange: (filePath: string[]) => void;
  setDefaultDisplay: () => void;
}
type TableType = string[][];

const CustomFilter = ({ onFileChange, setDefaultDisplay }: Props) => {
  const [selectedOption, setselectedOption] = useState(0);
  const [kernelSize, setkernelSize] = useState(3);
  const [table, setTable] = useState<TableType>(
    Array.from({ length: kernelSize }, () => Array(kernelSize).fill(""))
  );

  function parseNumber(numStr : string) {
    if (numStr.includes("/")) {
      let parts = numStr.split("/");
      let num1 = Number(parts[0]);
      let num2 = Number(parts[1]);

      if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
        return num1 / num2;
      } else {
        console.log("Invalid input");
        return NaN;
      }
    } else {
      return Number(numStr);
    }
  }

  useEffect(() => {
    let initialTable: TableType = Array.from({ length: kernelSize }, () =>
      Array(kernelSize).fill("")
    );
    setTable(initialTable);
  }, [kernelSize]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number
  ) => {
    const newTable = table.map((row) => [...row]);
    newTable[rowIndex][columnIndex] = event.target.value;
    setTable(newTable);
    console.log(newTable);
  };

  const syarat = () => {
    if (selectedOption === 0) {
      return (
        <>
          {" "}
          = 1 <br />
          dimana g(i,j) &gt; 0{" "}
        </>
      );
    } else if (selectedOption === 1) {
      return (
        <>
          {" "}
          = 0 <br />
          dimana g(i,j) (- | 0 | +){" "}
        </>
      );
    } else if (selectedOption === 2) {
      return (
        <>
          {" "}
          &ne; 0 <br />
          dimana g(i,j) (- | 0 | +){" "}
        </>
      );
    }
  };

  const memenuhiSyarat = () => {
    let sum = table.reduce((total, subArr) => {
      return (
        total + subArr.reduce((subTotal, num) => subTotal + parseNumber(num), 0)
      );
    }, 0);
    let allPositive = table.every((subArr) =>
      subArr.every((num) => parseNumber(num) > 0)
    );

    if (selectedOption === 0) {
      if (!(sum === 1 && allPositive)) {
        return <p className="text-red-500">Tidak memenuhi syarat</p>;
      }
    } else if (selectedOption === 1 && !(sum === 0)) {
      return <p className="text-red-500">Tidak memenuhi syarat</p>;
    } else if (selectedOption === 2 && sum === 0) {
      return <p className="text-red-500">Tidak memenuhi syarat</p>;
    }
  };

  return (
    <>
      <form action="">
        <input
          type="radio"
          id="low"
          value="0"
          checked={selectedOption === 0}
          onChange={(e) => {
            setselectedOption(parseInt(e.target.value));
          }}
        />
        <label htmlFor="low"> Lowpass</label>
        <br />
        <input
          type="radio"
          id="high"
          value="1"
          checked={selectedOption === 1}
          onChange={(e) => {
            setselectedOption(parseInt(e.target.value));
          }}
        />
        <label htmlFor="high"> Highpass</label>
        <br />
        <input
          type="radio"
          id="band"
          value="2"
          checked={selectedOption === 2}
          onChange={(e) => {
            setselectedOption(parseInt(e.target.value));
          }}
        />
        <label htmlFor="band"> Bandpass</label>
      </form>
      <div>
        <h2>Syarat:</h2>
        <div className="font-bold ml-4 mb-2">
          Σ<sub>i</sub>Σ<sub>j</sub> g(i,j) {syarat()}
        </div>
        <div>
          <h2>Ukuran kernel:</h2>
          <input
            className="border border-black text-center w-[45%]"
            value={kernelSize}
            type="number"
            onChange={(e) => {
              setkernelSize(parseInt(e.target.value));
            }}
          />
        </div>

        <div className="flex h-38 w-38">
          <div className="grid gap-y-1 mt-4 overflow-auto">
            {table.map((row, rowIndex) => (
              <div key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <input
                    className="border border-black w-[18%] text-center mr-1"
                    key={columnIndex}
                    value={cell}
                    onChange={(event) =>
                      handleInputChange(event, rowIndex, columnIndex)
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>{memenuhiSyarat()}</div>
        <ButtonCustomFilter
          kernel={table}
          onFileChange={onFileChange}
          setDefaultDisplay={setDefaultDisplay}
        />
      </div>
    </>
  );
};

export default CustomFilter;
