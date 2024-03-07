import { FallingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <FallingLines
        color="#bef264"
        width="100"
        visible={true}
        // ariaLabel="falling-circles-loading"
      />
      <div className="font-extrabold">Loading...</div>
    </div>
  );
}
