"use client";

import * as Collapsible from "@/components/ui/collapsible";
import { css } from "styled-system/css";
import {
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface FileTreeContextType {
  expandedPaths: Set<string>;
  togglePath: (path: string) => void;
  selectedPath?: string;
  onSelect?: (path: string) => void;
}

// Default noop for context default value
// oxlint-disable-next-line eslint(no-empty-function)
const noop = () => {};

const FileTreeContext = createContext<FileTreeContextType>({
  // oxlint-disable-next-line eslint-plugin-unicorn(no-new-builtin)
  expandedPaths: new Set(),
  togglePath: noop,
});

export type FileTreeProps = Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  expanded?: Set<string>;
  defaultExpanded?: Set<string>;
  selectedPath?: string;
  onSelect?: (path: string) => void;
  onExpandedChange?: (expanded: Set<string>) => void;
};

export const FileTree = ({
  expanded: controlledExpanded,
  defaultExpanded = new Set(),
  selectedPath,
  onSelect,
  onExpandedChange,
  className,
  children,
  ...props
}: FileTreeProps) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expandedPaths = controlledExpanded ?? internalExpanded;

  const togglePath = useCallback(
    (path: string) => {
      const newExpanded = new Set(expandedPaths);
      if (newExpanded.has(path)) {
        newExpanded.delete(path);
      } else {
        newExpanded.add(path);
      }
      setInternalExpanded(newExpanded);
      onExpandedChange?.(newExpanded);
    },
    [expandedPaths, onExpandedChange],
  );

  const contextValue = useMemo(
    () => ({ expandedPaths, onSelect, selectedPath, togglePath }),
    [expandedPaths, onSelect, selectedPath, togglePath],
  );

  return (
    <FileTreeContext.Provider value={contextValue}>
      <div
        className={css(
          {
            borderRadius: "l2",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "border",
            backgroundColor: "bg.default",
            fontFamily: "mono",
            fontSize: "sm",
          },
          className,
        )}
        role="tree"
        {...props}
      >
        <div
          className={css({
            padding: "2",
          })}
        >
          {children}
        </div>
      </div>
    </FileTreeContext.Provider>
  );
};

export type FileTreeIconProps = HTMLAttributes<HTMLSpanElement>;

export const FileTreeIcon = ({
  className,
  children,
  ...props
}: FileTreeIconProps) => (
  <span
    className={css(
      {
        flexShrink: "0",
      },
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

export type FileTreeNameProps = HTMLAttributes<HTMLSpanElement>;

export const FileTreeName = ({
  className,
  children,
  ...props
}: FileTreeNameProps) => (
  <span
    className={css(
      {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

interface FileTreeFolderContextType {
  path: string;
  name: string;
  isExpanded: boolean;
}

const FileTreeFolderContext = createContext<FileTreeFolderContextType>({
  isExpanded: false,
  name: "",
  path: "",
});

export type FileTreeFolderProps = HTMLAttributes<HTMLDivElement> & {
  path: string;
  name: string;
};

export const FileTreeFolder = ({
  path,
  name,
  className,
  children,
  ...props
}: FileTreeFolderProps) => {
  const { expandedPaths, togglePath, selectedPath, onSelect } =
    useContext(FileTreeContext);
  const isExpanded = expandedPaths.has(path);
  const isSelected = selectedPath === path;

  const handleOpenChange = useCallback(() => {
    togglePath(path);
  }, [togglePath, path]);

  const handleSelect = useCallback(() => {
    onSelect?.(path);
  }, [onSelect, path]);

  const folderContextValue = useMemo(
    () => ({ isExpanded, name, path }),
    [isExpanded, name, path],
  );

  return (
    <FileTreeFolderContext.Provider value={folderContextValue}>
      <Collapsible.Root onOpenChange={handleOpenChange} open={isExpanded}>
        <div className={className} role="treeitem" tabIndex={0} {...props}>
          <div
            className={css(
              {
                display: "flex",
                width: "full",
                alignItems: "center",
                gap: "1",
                borderRadius: "l2",
                paddingX: "2",
                paddingY: "1",
                textAlign: "left",
                transition: "colors",
                _hover: {
                  backgroundColor: "bg.subtle/50",
                },
              },
              isSelected && {
                backgroundColor: "bg.subtle",
              },
            )}
          >
            <Collapsible.Trigger asChild>
              <button
                className={css({
                  display: "flex",
                  flexShrink: "0",
                  cursor: "pointer",
                  alignItems: "center",
                  borderWidth: "0",
                  backgroundColor: "transparent",
                  padding: "0",
                })}
                type="button"
              >
                <ChevronRightIcon
                  className={css(
                    {
                      width: "4",
                      height: "4",
                      flexShrink: "0",
                      color: "fg.muted",
                      transition: "transform 0.2s",
                    },
                    isExpanded && {
                      transform: "rotate(90deg)",
                    },
                  )}
                />
              </button>
            </Collapsible.Trigger>
            <button
              className={css({
                display: "flex",
                minWidth: "0",
                flex: "1",
                cursor: "pointer",
                alignItems: "center",
                gap: "1",
                borderWidth: "0",
                backgroundColor: "transparent",
                padding: "0",
                textAlign: "left",
              })}
              onClick={handleSelect}
              type="button"
            >
              <FileTreeIcon>
                {isExpanded ? (
                  <FolderOpenIcon
                    className={css({
                      width: "4",
                      height: "4",
                      color: "blue.5",
                    })}
                  />
                ) : (
                  <FolderIcon
                    className={css({
                      width: "4",
                      height: "4",
                      color: "blue.5",
                    })}
                  />
                )}
              </FileTreeIcon>
              <FileTreeName>{name}</FileTreeName>
            </button>
          </div>
          <Collapsible.Content>
            <div
              className={css({
                marginLeft: "1rem",
                borderLeftWidth: "1px",
                borderLeftStyle: "solid",
                borderLeftColor: "border",
                paddingLeft: "2",
              })}
            >
              {children}
            </div>
          </Collapsible.Content>
        </div>
      </Collapsible.Root>
    </FileTreeFolderContext.Provider>
  );
};

interface FileTreeFileContextType {
  path: string;
  name: string;
}

const FileTreeFileContext = createContext<FileTreeFileContextType>({
  name: "",
  path: "",
});

export type FileTreeFileProps = HTMLAttributes<HTMLDivElement> & {
  path: string;
  name: string;
  icon?: ReactNode;
};

export const FileTreeFile = ({
  path,
  name,
  icon,
  className,
  children,
  ...props
}: FileTreeFileProps) => {
  const { selectedPath, onSelect } = useContext(FileTreeContext);
  const isSelected = selectedPath === path;

  const handleClick = useCallback(() => {
    onSelect?.(path);
  }, [onSelect, path]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        onSelect?.(path);
      }
    },
    [onSelect, path],
  );

  const fileContextValue = useMemo(() => ({ name, path }), [name, path]);

  return (
    <FileTreeFileContext.Provider value={fileContextValue}>
      <div
        className={css(
          {
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            gap: "1",
            borderRadius: "l2",
            paddingX: "2",
            paddingY: "1",
            transition: "colors",
            _hover: {
              backgroundColor: "bg.subtle/50",
            },
          },
          isSelected && {
            backgroundColor: "bg.subtle",
          },
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="treeitem"
        tabIndex={0}
        {...props}
      >
        {children ?? (
          <>
            {/* Spacer for alignment */}
            <span
              className={css({
                width: "4",
                height: "4",
                flexShrink: "0",
              })}
            />
            <FileTreeIcon>
              {icon ?? (
                <FileIcon
                  className={css({
                    width: "4",
                    height: "4",
                    color: "fg.muted",
                  })}
                />
              )}
            </FileTreeIcon>
            <FileTreeName>{name}</FileTreeName>
          </>
        )}
      </div>
    </FileTreeFileContext.Provider>
  );
};

export type FileTreeActionsProps = HTMLAttributes<HTMLDivElement>;

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

export const FileTreeActions = ({
  className,
  children,
  ...props
}: FileTreeActionsProps) => (
  <div
    className={css(
      {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: "1",
      },
      className,
    )}
    onClick={stopPropagation}
    onKeyDown={stopPropagation}
    role="group"
    {...props}
  >
    {children}
  </div>
);
