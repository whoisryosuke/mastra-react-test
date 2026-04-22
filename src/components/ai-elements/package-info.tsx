"use client";

import { Badge } from "@/components/ui/badge";
import { css } from "styled-system/css";
import { ArrowRightIcon, MinusIcon, PackageIcon, PlusIcon } from "lucide-react";
import type { HTMLAttributes } from "react";
import { createContext, useContext, useMemo } from "react";

type ChangeType = "major" | "minor" | "patch" | "added" | "removed";

interface PackageInfoContextType {
  name: string;
  currentVersion?: string;
  newVersion?: string;
  changeType?: ChangeType;
}

const PackageInfoContext = createContext<PackageInfoContextType>({
  name: "",
});

export type PackageInfoHeaderProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoHeader = ({
  className,
  children,
  ...props
}: PackageInfoHeaderProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type PackageInfoNameProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoName = ({
  className,
  children,
  ...props
}: PackageInfoNameProps) => {
  const { name } = useContext(PackageInfoContext);

  return (
    <div
      className={css(
        {
          display: "flex",
          alignItems: "center",
          gap: "2",
        },
        className,
      )}
      {...props}
    >
      <PackageIcon
        className={css({ width: "4", height: "4", color: "muted.foreground" })}
      />
      <span
        className={css({
          fontWeight: "medium",
          fontFamily: "mono",
          fontSize: "sm",
        })}
      >
        {children ?? name}
      </span>
    </div>
  );
};

const changeTypeStyles: Record<ChangeType, ReturnType<typeof css>> = {
  added: css({
    backgroundColor: "blue.100",
    color: "blue.700",
    _dark: {
      backgroundColor: "blue.900 / 0.3",
      color: "blue.400",
    },
  }),
  major: css({
    backgroundColor: "red.100",
    color: "red.700",
    _dark: {
      backgroundColor: "red.900 / 0.3",
      color: "red.400",
    },
  }),
  minor: css({
    backgroundColor: "yellow.100",
    color: "yellow.700",
    _dark: {
      backgroundColor: "yellow.900 / 0.3",
      color: "yellow.400",
    },
  }),
  patch: css({
    backgroundColor: "green.100",
    color: "green.700",
    _dark: {
      backgroundColor: "green.900 / 0.3",
      color: "green.400",
    },
  }),
  removed: css({
    backgroundColor: "gray.100",
    color: "gray.700",
    _dark: {
      backgroundColor: "gray.900 / 0.3",
      color: "gray.400",
    },
  }),
};

const changeTypeIcons: Record<ChangeType, React.ReactNode> = {
  added: <PlusIcon className={css({ width: "3", height: "3" })} />,
  major: <ArrowRightIcon className={css({ width: "3", height: "3" })} />,
  minor: <ArrowRightIcon className={css({ width: "3", height: "3" })} />,
  patch: <ArrowRightIcon className={css({ width: "3", height: "3" })} />,
  removed: <MinusIcon className={css({ width: "3", height: "3" })} />,
};

export type PackageInfoChangeTypeProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoChangeType = ({
  children,
  ...props
}: PackageInfoChangeTypeProps) => {
  const { changeType } = useContext(PackageInfoContext);

  if (!changeType) {
    return null;
  }

  return (
    <Badge
      className={css(
        {
          gap: "1",
          fontSize: "xs",
          textTransform: "capitalize",
        },
        changeTypeStyles[changeType],
      )}
      {...props}
    >
      {changeTypeIcons[changeType]}
      {children ?? changeType}
    </Badge>
  );
};

export type PackageInfoVersionProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoVersion = ({
  className,
  children,
  ...props
}: PackageInfoVersionProps) => {
  const { currentVersion, newVersion } = useContext(PackageInfoContext);

  if (!(currentVersion || newVersion)) {
    return null;
  }

  return (
    <div
      className={css(
        {
          marginTop: "2",
          display: "flex",
          alignItems: "center",
          gap: "2",
          fontFamily: "mono",
          color: "muted.foreground",
          fontSize: "sm",
        },
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          {currentVersion && <span>{currentVersion}</span>}
          {currentVersion && newVersion && (
            <ArrowRightIcon className={css({ width: "3", height: "3" })} />
          )}
          {newVersion && (
            <span
              className={css({ fontWeight: "medium", color: "foreground" })}
            >
              {newVersion}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export type PackageInfoProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  currentVersion?: string;
  newVersion?: string;
  changeType?: ChangeType;
};

export const PackageInfo = ({
  name,
  currentVersion,
  newVersion,
  changeType,
  className,
  children,
  ...props
}: PackageInfoProps) => {
  const contextValue = useMemo(
    () => ({ changeType, currentVersion, name, newVersion }),
    [changeType, currentVersion, name, newVersion],
  );

  return (
    <PackageInfoContext.Provider value={contextValue}>
      <div
        className={css(
          {
            borderRadius: "lg",
            borderWidth: "1px",
            backgroundColor: "background",
            padding: "4",
          },
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            <PackageInfoHeader>
              <PackageInfoName />
              {changeType && <PackageInfoChangeType />}
            </PackageInfoHeader>
            {(currentVersion || newVersion) && <PackageInfoVersion />}
          </>
        )}
      </div>
    </PackageInfoContext.Provider>
  );
};

export type PackageInfoDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const PackageInfoDescription = ({
  className,
  children,
  ...props
}: PackageInfoDescriptionProps) => (
  <p
    className={css(
      {
        marginTop: "2",
        color: "muted.foreground",
        fontSize: "sm",
      },
      className,
    )}
    {...props}
  >
    {children}
  </p>
);

export type PackageInfoContentProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoContent = ({
  className,
  children,
  ...props
}: PackageInfoContentProps) => (
  <div
    className={css(
      {
        marginTop: "3",
        borderTopWidth: "1px",
        paddingTop: "3",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type PackageInfoDependenciesProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoDependencies = ({
  className,
  children,
  ...props
}: PackageInfoDependenciesProps) => (
  <div
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        gap: "2",
      },
      className,
    )}
    {...props}
  >
    <span
      className={css({
        fontWeight: "medium",
        color: "muted.foreground",
        fontSize: "xs",
        textTransform: "uppercase",
        letterSpacing: "wide",
      })}
    >
      Dependencies
    </span>
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "1",
      })}
    >
      {children}
    </div>
  </div>
);

export type PackageInfoDependencyProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  version?: string;
};

export const PackageInfoDependency = ({
  name,
  version,
  className,
  children,
  ...props
}: PackageInfoDependencyProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "sm",
      },
      className,
    )}
    {...props}
  >
    {children ?? (
      <>
        <span
          className={css({ fontFamily: "mono", color: "muted.foreground" })}
        >
          {name}
        </span>
        {version && (
          <span className={css({ fontFamily: "mono", fontSize: "xs" })}>
            {version}
          </span>
        )}
      </>
    )}
  </div>
);
