"use client";

import { Badge } from "@/components/ui/badge";
import * as Collapsible from "@/components/ui/collapsible";
import { css } from "styled-system/css";
import { ChevronRightIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";
import { createContext, useContext, useMemo } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface SchemaParameter {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  location?: "path" | "query" | "header";
}

interface SchemaProperty {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  properties?: SchemaProperty[];
  items?: SchemaProperty;
}

interface SchemaDisplayContextType {
  method: HttpMethod;
  path: string;
  description?: string;
  parameters?: SchemaParameter[];
  requestBody?: SchemaProperty[];
  responseBody?: SchemaProperty[];
}

const SchemaDisplayContext = createContext<SchemaDisplayContextType>({
  method: "GET",
  path: "",
});

const methodStyles: Record<HttpMethod, ReturnType<typeof css>> = {
  DELETE: css({
    backgroundColor: "red.100",
    color: "red.700",
    _dark: { backgroundColor: "red.900 / 0.3", color: "red.400" },
  }),
  GET: css({
    backgroundColor: "green.100",
    color: "green.700",
    _dark: { backgroundColor: "green.900 / 0.3", color: "green.400" },
  }),
  PATCH: css({
    backgroundColor: "yellow.100",
    color: "yellow.700",
    _dark: { backgroundColor: "yellow.900 / 0.3", color: "yellow.400" },
  }),
  POST: css({
    backgroundColor: "blue.100",
    color: "blue.700",
    _dark: { backgroundColor: "blue.900 / 0.3", color: "blue.400" },
  }),
  PUT: css({
    backgroundColor: "orange.100",
    color: "orange.700",
    _dark: { backgroundColor: "orange.900 / 0.3", color: "orange.400" },
  }),
};

const requiredBadgeStyle = css({
  backgroundColor: "red.100",
  color: "red.700",
  fontSize: "xs",
  _dark: { backgroundColor: "red.900 / 0.3", color: "red.400" },
});

export type SchemaDisplayHeaderProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayHeader = ({
  className,
  children,
  ...props
}: SchemaDisplayHeaderProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        gap: "3",
        borderBottomWidth: "1px",
        paddingX: "4",
        paddingY: "3",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type SchemaDisplayMethodProps = ComponentProps<typeof Badge>;

export const SchemaDisplayMethod = ({
  className,
  children,
  ...props
}: SchemaDisplayMethodProps) => {
  const { method } = useContext(SchemaDisplayContext);

  return (
    <Badge
      className={css(
        { fontFamily: "mono", fontSize: "xs" },
        methodStyles[method],
        className,
      )}
      {...props}
    >
      {children ?? method}
    </Badge>
  );
};

export type SchemaDisplayPathProps = HTMLAttributes<HTMLSpanElement>;

export const SchemaDisplayPath = ({
  className,
  children,
  ...props
}: SchemaDisplayPathProps) => {
  const { path } = useContext(SchemaDisplayContext);

  const highlightedPath = path.replaceAll(
    /\{([^}]+)\}/g,
    '<span class="text-blue-600 dark:text-blue-400">{$1}</span>',
  );

  return (
    <span
      className={css({ fontFamily: "mono", fontSize: "sm" }, className)}
      dangerouslySetInnerHTML={{ __html: children ?? highlightedPath }}
      {...props}
    />
  );
};

export type SchemaDisplayDescriptionProps =
  HTMLAttributes<HTMLParagraphElement>;

export const SchemaDisplayDescription = ({
  className,
  children,
  ...props
}: SchemaDisplayDescriptionProps) => {
  const { description } = useContext(SchemaDisplayContext);

  return (
    <p
      className={css(
        {
          borderBottomWidth: "1px",
          paddingX: "4",
          paddingY: "3",
          color: "muted.foreground",
          fontSize: "sm",
        },
        className,
      )}
      {...props}
    >
      {children ?? description}
    </p>
  );
};

export type SchemaDisplayContentProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayContent = ({
  className,
  children,
  ...props
}: SchemaDisplayContentProps) => (
  <div className={css({ borderBottomWidth: "1px" }, className)} {...props}>
    {children}
  </div>
);

export type SchemaDisplayParameterProps = HTMLAttributes<HTMLDivElement> &
  SchemaParameter;

export const SchemaDisplayParameter = ({
  name,
  type,
  required,
  description,
  location,
  className,
  ...props
}: SchemaDisplayParameterProps) => (
  <div
    className={css(
      { paddingX: "4", paddingY: "3", paddingLeft: "10" },
      className,
    )}
    {...props}
  >
    <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
      <span className={css({ fontFamily: "mono", fontSize: "sm" })}>
        {name}
      </span>
      <Badge className={css({ fontSize: "xs" })} variant="outline">
        {type}
      </Badge>
      {location && (
        <Badge className={css({ fontSize: "xs" })} variant="subtle">
          {location}
        </Badge>
      )}
      {required && <Badge className={requiredBadgeStyle}>required</Badge>}
    </div>
    {description && (
      <p
        className={css({
          marginTop: "1",
          color: "muted.foreground",
          fontSize: "sm",
        })}
      >
        {description}
      </p>
    )}
  </div>
);

export type SchemaDisplayParametersProps = ComponentProps<
  typeof Collapsible.Root
>;

export const SchemaDisplayParameters = ({
  className,
  children,
  ...props
}: SchemaDisplayParametersProps) => {
  const { parameters } = useContext(SchemaDisplayContext);

  return (
    <Collapsible.Root className={className} defaultOpen {...props}>
      <Collapsible.Trigger
        className={css({
          display: "flex",
          width: "full",
          alignItems: "center",
          gap: "2",
          paddingX: "4",
          paddingY: "3",
          textAlign: "left",
          transitionProperty: "colors",
          transitionDuration: "200ms",
          _hover: { backgroundColor: "muted / 0.5" },
        })}
      >
        <ChevronRightIcon
          className={css({
            width: "4",
            height: "4",
            flexShrink: "0",
            color: "muted.foreground",
            transitionProperty: "transform",
            transitionDuration: "200ms",
            _groupDataOpen: { transform: "rotate(90deg)" },
          })}
        />
        <span className={css({ fontWeight: "medium", fontSize: "sm" })}>
          Parameters
        </span>
        <Badge
          className={css({ marginLeft: "auto", fontSize: "xs" })}
          variant="subtle"
        >
          {parameters?.length}
        </Badge>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className={css({ borderTopWidth: "1px" })}>
          {children ??
            parameters?.map((param) => (
              <SchemaDisplayParameter key={param.name} {...param} />
            ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export type SchemaDisplayPropertyProps = HTMLAttributes<HTMLDivElement> &
  SchemaProperty & {
    depth?: number;
  };

export const SchemaDisplayProperty = ({
  name,
  type,
  required,
  description,
  properties,
  items,
  depth = 0,
  className,
  ...props
}: SchemaDisplayPropertyProps) => {
  const hasChildren = properties || items;
  const paddingLeft = 40 + depth * 16;

  if (hasChildren) {
    return (
      <Collapsible.Root defaultOpen={depth < 2}>
        <Collapsible.Trigger
          className={css(
            {
              display: "flex",
              width: "full",
              alignItems: "center",
              gap: "2",
              paddingY: "3",
              textAlign: "left",
              transitionProperty: "colors",
              transitionDuration: "200ms",
              _hover: { backgroundColor: "muted / 0.5" },
            },
            className,
          )}
          style={{ paddingLeft }}
        >
          <ChevronRightIcon
            className={css({
              width: "4",
              height: "4",
              flexShrink: "0",
              color: "muted.foreground",
              transitionProperty: "transform",
              transitionDuration: "200ms",
              _groupDataOpen: { transform: "rotate(90deg)" },
            })}
          />
          <span className={css({ fontFamily: "mono", fontSize: "sm" })}>
            {name}
          </span>
          <Badge className={css({ fontSize: "xs" })} variant="outline">
            {type}
          </Badge>
          {required && <Badge className={requiredBadgeStyle}>required</Badge>}
        </Collapsible.Trigger>
        {description && (
          <p
            className={css({
              paddingBottom: "2",
              color: "muted.foreground",
              fontSize: "sm",
            })}
            style={{ paddingLeft: paddingLeft + 24 }}
          >
            {description}
          </p>
        )}
        <Collapsible.Content>
          <div className={css({ borderTopWidth: "1px" })}>
            {properties?.map((prop) => (
              <SchemaDisplayProperty
                key={prop.name}
                {...prop}
                depth={depth + 1}
              />
            ))}
            {items && (
              <SchemaDisplayProperty
                {...items}
                depth={depth + 1}
                name={`${name}[]`}
              />
            )}
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  return (
    <div
      className={css({ paddingY: "3", paddingRight: "4" }, className)}
      style={{ paddingLeft }}
      {...props}
    >
      <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
        <span className={css({ width: "4", height: "4" })} />
        <span className={css({ fontFamily: "mono", fontSize: "sm" })}>
          {name}
        </span>
        <Badge className={css({ fontSize: "xs" })} variant="outline">
          {type}
        </Badge>
        {required && <Badge className={requiredBadgeStyle}>required</Badge>}
      </div>
      {description && (
        <p
          className={css({
            marginTop: "1",
            paddingLeft: "6",
            color: "muted.foreground",
            fontSize: "sm",
          })}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export type SchemaDisplayRequestProps = ComponentProps<typeof Collapsible.Root>;

export const SchemaDisplayRequest = ({
  className,
  children,
  ...props
}: SchemaDisplayRequestProps) => {
  const { requestBody } = useContext(SchemaDisplayContext);

  return (
    <Collapsible.Root className={className} defaultOpen {...props}>
      <Collapsible.Trigger
        className={css({
          display: "flex",
          width: "full",
          alignItems: "center",
          gap: "2",
          paddingX: "4",
          paddingY: "3",
          textAlign: "left",
          transitionProperty: "colors",
          transitionDuration: "200ms",
          _hover: { backgroundColor: "muted / 0.5" },
        })}
      >
        <ChevronRightIcon
          className={css({
            width: "4",
            height: "4",
            flexShrink: "0",
            color: "muted.foreground",
            transitionProperty: "transform",
            transitionDuration: "200ms",
            _groupDataOpen: { transform: "rotate(90deg)" },
          })}
        />
        <span className={css({ fontWeight: "medium", fontSize: "sm" })}>
          Request Body
        </span>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className={css({ borderTopWidth: "1px" })}>
          {children ??
            requestBody?.map((prop) => (
              <SchemaDisplayProperty key={prop.name} {...prop} depth={0} />
            ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export type SchemaDisplayResponseProps = ComponentProps<
  typeof Collapsible.Root
>;

export const SchemaDisplayResponse = ({
  className,
  children,
  ...props
}: SchemaDisplayResponseProps) => {
  const { responseBody } = useContext(SchemaDisplayContext);

  return (
    <Collapsible.Root className={className} defaultOpen {...props}>
      <Collapsible.Trigger
        className={css({
          display: "flex",
          width: "full",
          alignItems: "center",
          gap: "2",
          paddingX: "4",
          paddingY: "3",
          textAlign: "left",
          transitionProperty: "colors",
          transitionDuration: "200ms",
          _hover: { backgroundColor: "muted / 0.5" },
        })}
      >
        <ChevronRightIcon
          className={css({
            width: "4",
            height: "4",
            flexShrink: "0",
            color: "muted.foreground",
            transitionProperty: "transform",
            transitionDuration: "200ms",
            _groupDataOpen: { transform: "rotate(90deg)" },
          })}
        />
        <span className={css({ fontWeight: "medium", fontSize: "sm" })}>
          Response
        </span>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className={css({ borderTopWidth: "1px" })}>
          {children ??
            responseBody?.map((prop) => (
              <SchemaDisplayProperty key={prop.name} {...prop} depth={0} />
            ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export type SchemaDisplayProps = HTMLAttributes<HTMLDivElement> & {
  method: HttpMethod;
  path: string;
  description?: string;
  parameters?: SchemaParameter[];
  requestBody?: SchemaProperty[];
  responseBody?: SchemaProperty[];
};

export const SchemaDisplay = ({
  method,
  path,
  description,
  parameters,
  requestBody,
  responseBody,
  className,
  children,
  ...props
}: SchemaDisplayProps) => {
  const contextValue = useMemo(
    () => ({
      description,
      method,
      parameters,
      path,
      requestBody,
      responseBody,
    }),
    [description, method, parameters, path, requestBody, responseBody],
  );

  return (
    <SchemaDisplayContext.Provider value={contextValue}>
      <div
        className={css(
          {
            overflow: "hidden",
            borderRadius: "lg",
            borderWidth: "1px",
            backgroundColor: "background",
          },
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            <SchemaDisplayHeader>
              <div
                className={css({
                  display: "flex",
                  alignItems: "center",
                  gap: "3",
                })}
              >
                <SchemaDisplayMethod />
                <SchemaDisplayPath />
              </div>
            </SchemaDisplayHeader>
            {description && <SchemaDisplayDescription />}
            <SchemaDisplayContent>
              {parameters && parameters.length > 0 && (
                <SchemaDisplayParameters />
              )}
              {requestBody && requestBody.length > 0 && (
                <SchemaDisplayRequest />
              )}
              {responseBody && responseBody.length > 0 && (
                <SchemaDisplayResponse />
              )}
            </SchemaDisplayContent>
          </>
        )}
      </div>
    </SchemaDisplayContext.Provider>
  );
};

export type SchemaDisplayBodyProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayBody = ({
  className,
  children,
  ...props
}: SchemaDisplayBodyProps) => (
  <div className={css({ borderBottomWidth: "1px" }, className)} {...props}>
    {children}
  </div>
);

export type SchemaDisplayExampleProps = HTMLAttributes<HTMLPreElement>;

export const SchemaDisplayExample = ({
  className,
  children,
  ...props
}: SchemaDisplayExampleProps) => (
  <pre
    className={css(
      {
        marginX: "4",
        marginBottom: "4",
        overflow: "auto",
        borderRadius: "md",
        backgroundColor: "muted",
        padding: "4",
        fontFamily: "mono",
        fontSize: "sm",
      },
      className,
    )}
    {...props}
  >
    {children}
  </pre>
);
