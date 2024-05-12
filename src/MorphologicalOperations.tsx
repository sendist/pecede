import { ChangeEvent, useEffect, useState } from "react";
import Button from "./Button";
import ButtonSendKernel from "./ButtonSendKernel";

interface Props {
  onFileChange: (filePath: string[]) => void;
  setDefaultDisplay: () => void;
}
type TableType = string[][];

const MorphologicalOperations = ({
  onFileChange,
  setDefaultDisplay,
}: Props) => {
  const [kernelSize, setkernelSize] = useState({ row: 3, column: 3 });
  const [table, setTable] = useState<TableType>(
    Array.from({ length: kernelSize.row }, () =>
      Array(kernelSize.column).fill("")
    )
  );
  const buttons = [
    { name: "Erosion", method: "erode" },
    { name: "Dilation", method: "dilate" },
    { name: "Opening", method: "open" },
    { name: "Closing", method: "close" },
  ];

  function parseNumber(numStr: string) {
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
    let initialTable: TableType = Array.from({ length: kernelSize.row }, () =>
      Array(kernelSize.column).fill("")
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

  return (
    <div>
      <div>
        <Button
          name="convert to binary"
          method="convert-to-binary"
          onFileChange={onFileChange}
          setDefaultDisplay={setDefaultDisplay}
        />
        <Button
          name="boundary"
          method="boundary-extraction"
          onFileChange={onFileChange}
          setDefaultDisplay={setDefaultDisplay}
        />
        <h2>Ukuran kernel:</h2>
        <input
          className="border border-black text-center w-[45%]"
          value={kernelSize.row}
          type="number"
          name="row"
          onChange={(e) => {
            setkernelSize({
              ...kernelSize,
              row: parseInt(e.target.value),
            });
          }}
        />
        <span> x </span>
        <input
          className="border border-black text-center w-[45%]"
          value={kernelSize.column}
          type="number"
          name="column"
          onChange={(e) => {
            setkernelSize({
              ...kernelSize,
              column: parseInt(e.target.value),
            });
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
      <div className="flex flex-row">
        {buttons.map((button) => (
          <ButtonSendKernel
            label={button.name}
            kernel={table}
            onFileChange={onFileChange}
            setDefaultDisplay={setDefaultDisplay}
            endpoint="morphology"
            operation={button.method}
          />
        ))}
      </div>
    </div>
  );
};

export default MorphologicalOperations;
