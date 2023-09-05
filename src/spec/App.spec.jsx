import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { userAtom } from "../atoms/userAtom";
import { showMainDosAtom } from "../atoms/postAtoms";

const mocks = vi.hoisted(() => {
  return {
    mockUser: { _id: "testId" },
    mockShowMainDos: false,
  };
});

vi.mock("../components/AuthWrapper", () => {
  return {
    default: ({ children }) => {
      if (!mocks.mockUser) {
        throw new Error("User not authenticated");
      }
      return children;
    },
  };
});

vi.mock("../components/MainDos", () => ({
  default: () => {
    return <div data-testid="main-dos">MainDos</div>;
  },
}));

vi.mock("../pages/Introduction", () => ({
  default: () => {
    return <div>Introduction</div>;
  },
}));

vi.mock("../pages/Login", () => ({
  default: () => {
    return <div>Login</div>;
  },
}));

vi.mock("../pages/Boards", () => ({
  default: () => {
    return <div>Boards</div>;
  },
}));

vi.mock("../pages/Board", () => ({
  default: () => {
    return <div>Board</div>;
  },
}));

vi.mock("../pages/Post", () => ({
  default: () => {
    return <div>Post</div>;
  },
}));

vi.mock("../pages/NewPost", () => ({
  default: () => {
    return <div>NewPost</div>;
  },
}));

vi.mock("../pages/EditPost", () => ({
  default: () => {
    return <div>EditPost</div>;
  },
}));

vi.mock("../pages/Messages", () => ({
  default: () => {
    return <div>Messages</div>;
  },
}));

vi.mock("../pages/ChatRooms", () => ({
  default: () => {
    return <div>ChatRooms</div>;
  },
}));

vi.mock("../pages/ChatRoom", () => ({
  default: () => {
    return <div>ChatRoom</div>;
  },
}));

vi.mock("../pages/Special", () => ({
  default: () => {
    return <div>Special</div>;
  },
}));

vi.mock("../pages/ErrorPage", () => ({
  default: () => {
    return <div>ErrorPage</div>;
  },
}));

describe("App Component", () => {
  beforeEach(() => {
    vi.mock("jotai", async () => {
      const actualJotai = await vi.importActual("jotai");

      return {
        ...actualJotai,
        useAtomValue: (atom) => {
          if (atom === userAtom) {
            return mocks.mockUser;
          }
          if (atom === showMainDosAtom) {
            return mocks.mockShowMainDos;
          }
        },
      };
    });
  });

  it("renders the Introduction page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Introduction")).toBeInTheDocument();
  });

  it("renders the Login page when visiting /login", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders the Boards page when visiting /boards", () => {
    render(
      <MemoryRouter initialEntries={["/boards"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Boards")).toBeInTheDocument();
  });

  it("renders the Messages page when visiting /boards/messages", () => {
    render(
      <MemoryRouter initialEntries={["/boards/messages"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Messages")).toBeInTheDocument();
  });

  it("does not render MainDos when showMainDos is false", () => {
    mocks.mockShowMainDos = false;

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const mainDos = screen.queryByTestId("main-dos");
    expect(mainDos).toBeNull();
  });

  it("renders MainDos when showMainDos is true", () => {
    mocks.mockShowMainDos = true;

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("main-dos")).toBeInTheDocument();
  });

  it("renders the Board page when visiting /boards/:boardName", () => {
    render(
      <MemoryRouter initialEntries={["/boards/general"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Board")).toBeInTheDocument();
  });

  it("renders the Post page when visiting /boards/:boardName/post/:index/:postId", () => {
    render(
      <MemoryRouter initialEntries={["/boards/general/post/1/12345"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Post")).toBeInTheDocument();
  });

  it("renders the NewPost page when visiting /boards/:boardName/post/new", () => {
    render(
      <MemoryRouter initialEntries={["/boards/general/post/new"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("NewPost")).toBeInTheDocument();
  });

  it("renders the EditPost page when visiting /boards/:boardName/post/:index/:postId/edit", () => {
    render(
      <MemoryRouter initialEntries={["/boards/general/post/1/12345/edit"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("EditPost")).toBeInTheDocument();
  });

  it("renders the ChatRooms page when visiting /boards/chatRooms", () => {
    render(
      <MemoryRouter initialEntries={["/boards/chatRooms"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("ChatRooms")).toBeInTheDocument();
  });

  it("renders the ChatRoom page when visiting /boards/chatRooms/:index/:roomId", () => {
    render(
      <MemoryRouter initialEntries={["/boards/chatRooms/1/67890"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("ChatRoom")).toBeInTheDocument();
  });

  it("renders the Special page when visiting /boards/special", () => {
    render(
      <MemoryRouter initialEntries={["/boards/special"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Special")).toBeInTheDocument();
  });

  it("renders the ErrorPage when an error occurs", () => {
    mocks.mockUser = undefined;

    render(
      <MemoryRouter initialEntries={["/boards/messages"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("ErrorPage")).toBeInTheDocument();
  });
});
