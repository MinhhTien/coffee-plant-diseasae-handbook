import { ErrorResponseDto } from "@/utils/error.dto";
import { auth, provider } from "@/utils/firebase/auth";
import { db } from "@/utils/firebase/firestore";
import { notify } from "@/utils/toastify";
import { signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { decodeJwt } from "jose";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IUserTokenPayload {
  name?: string;
  email?: string;
  picture?: string;
  user_id?: string;
  sub?: string;
  iat?: number;
  exp?: number;
}

interface IAuthContextValue {
  userTokenPayload: IUserTokenPayload | null;
  login: () => Promise<ErrorResponseDto | null>;
  logout: () => void;
}

const defaultContextValue: IAuthContextValue = {
  userTokenPayload: null,
  login: () => Promise.resolve(null),
  logout: () => {},
};

export const AuthContext =
  createContext<IAuthContextValue>(defaultContextValue);

const checkExistUser = async (jwtPayload: IUserTokenPayload) => {
  const q = query(
    collection(db, "user"),
    where("user_id", "==", jwtPayload.user_id),
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    await addDoc(collection(db, "user"), {
      ...jwtPayload,
      createdAt: serverTimestamp(),
    });
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [jwtPayload, setJwtPayload] = useState<IUserTokenPayload | null>(null);

  // const accessToken = localStorage.getItem("accessToken");
  // const [jwtPayload, setJwtPayload] = useState<IUserTokenPayload | null>(
  //   accessToken ? (decodeJwt(accessToken) as IUserTokenPayload) : null,
  // );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedPayload = decodeJwt(accessToken) as IUserTokenPayload;
      setJwtPayload(decodedPayload);
    }
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      const user = result.user;
      const token = await user.getIdToken();

      const jwtPayload = {
        name: user.displayName ?? undefined,
        email: user.email ?? undefined,
        user_id: user.uid,
        picture: user.photoURL ?? undefined,
        sub: user.uid,
        iat: 0,
        exp: 0,
      };

      setJwtPayload(jwtPayload);

      checkExistUser(jwtPayload);

      localStorage.setItem("accessToken", token);
      notify("Đăng nhập thành công");
      router.push("/");
      return null;
    } catch (error) {
      console.log(error);
      return error as ErrorResponseDto;
    }

    // if (response) {
    //   const { accessToken, refreshToken } = response.data
    //     .data as LoginResponseDto;
    //   localStorage.setItem("accessToken", accessToken);
    //   localStorage.setItem("refreshToken", refreshToken);
    //   const decoded = decodeJwt(accessToken);
    //   setJwtPayload(decoded as IUserTokenPayload);
    //   return null;
    // } else if (error!.response) {
    //   return error!.response.data as ErrorResponseDto;
    // } else {
    //   return { message: APP_MESSAGE.LOGIN_FAIL } as ErrorResponseDto;
    // }
  };

  const logout = () => {
    // const refreshToken = localStorage.getItem("refreshToken");
    // if (refreshToken)
    //   callApi("/auth/instructor/logout", "POST", {}, {}, { refreshToken });
    if (jwtPayload) setJwtPayload(null);
    notify("Đăng xuất thành công");
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        // userTokenPayload: {},
        userTokenPayload: jwtPayload
          ? {
              ...jwtPayload,
              iat: jwtPayload.iat ? jwtPayload.iat : 0,
              exp: jwtPayload.exp ? jwtPayload.exp : 0,
            }
          : null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
