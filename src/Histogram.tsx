interface Props {
  filePaths: string[];
}
const Histogram = ({ filePaths }: Props) => {
  return (
    <div className="flex flex-row gap-x-4">
      {filePaths.map((filePath) => (
        <img width="30%" key={filePath} src={filePath} alt="" />
      ))}
    </div>
  );
};

export default Histogram;
