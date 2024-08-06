type ActionError = {
  message: string;
  code: string;
  errors?: [];
};

export type ActionResponse<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: T;
      error: ActionError;
    };

export const Action = {
  success<T>(data: T): ActionResponse<T> {
    return { data, error: null };
  },
  error(error: ActionError | Error | unknown): ActionResponse<null> {
    if (error instanceof Error) {
      return {
        data: null,
        error: {
          message: error.message,
          code: error.name,
        },
      };
    }

    return {
      data: null,
      error: {
        message: (error as ActionError).message ?? "An unknown error occurred",
        code: (error as ActionError).code ?? "UNKNOWN_ERROR",
        errors: (error as ActionError).errors ?? [],
      },
    };
  },
};
