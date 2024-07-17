type PrimaryButtonProps = {
  children?: React.ReactNode;
  classes?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickHandler?: (e: any) => any;
};

const PrimaryButton = ({
  children,
  classes,
  onClickHandler,
}: PrimaryButtonProps) => {
  return (
    <button
      className={`text-pink-600 border py-1 px-5 rounded-full transition hover:bg-pink-default ${classes}`}
      onClick={(e) => {
        if (onClickHandler) {
          onClickHandler(e);
        }
      }}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
