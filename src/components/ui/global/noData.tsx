interface NoDataProps extends React.ClassAttributes<HTMLDivElement> {
  message?: string;
  className?: string;
}

export const NoData = ({ message = 'No data', ...props }: NoDataProps) => {
  return (
    <div className="flex justify-center items-center">
      <div {...props}>{message}</div>
    </div>
  );
};
