import React, { 
  createContext, 
  useState, 
  useContext, 
  ReactNode
} from 'react';

type Context = {
  loading: boolean;
  setLoading: Function;

  isLoadingToken: boolean; 
  setIsLoadingToken: Function;

  modalVisible: boolean; 
  setModalVisible: Function;

  modalVisibleCV: boolean;
  setModalVisibleCV: Function;

  profile: {
    email: string;
    family_name: string;
    given_name: string;
    locale: string;
    name: string;
    picture: string;
  }
  setProfile: Function;

  profiles: any; 
  setProfiles: Function;

  tokenProfile: number;
  setTokenProfile: Function;

  listDashboard: any;
  setListDashboard: Function;

  user: any; 
  setUser: Function;

  groupBy: any; 
  setGroupBy: Function;

  count: number; 
  setCount: Function;
}

type ContextProps = {
  children: ReactNode;
}

type Profile = {
  email: string;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
}

export const UpdateContext = createContext({} as Context);

export default function UpdateProvider({ children }: ContextProps) {
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({} as Profile);
  const [profiles, setProfiles] = useState({} as Profile);
  const [tokenProfile, setTokenProfile] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleCV, setModalVisibleCV] = useState(false);

  const [ isLoadingToken, setIsLoadingToken ] = useState(false);
  const [listDashboard, setListDashboard] = useState([]);
  const [groupBy, setGroupBy] = useState([]);
  const [user, setUser] = useState({});

  return (
    <UpdateContext.Provider value={{
      loading,
      setLoading,

      isLoadingToken, 
      setIsLoadingToken,

      profile, 
      setProfile,

      profiles, 
      setProfiles,

      tokenProfile, 
      setTokenProfile,

      modalVisible, 
      setModalVisible,

      modalVisibleCV, 
      setModalVisibleCV,

      listDashboard, 
      setListDashboard,

      user, 
      setUser,

      groupBy, 
      setGroupBy,

      count,
      setCount,
    }}>
      {children}
    </UpdateContext.Provider>
  );
}

export function userLoading() {
  const context = useContext(UpdateContext);
  const { loading, setLoading } = context;
  const {isLoadingToken, setIsLoadingToken} = context;
  return { 
    loading, 
    setLoading,
    isLoadingToken,
    setIsLoadingToken 
  }
}

export function userProfile() {
  const context = useContext(UpdateContext);
  const { profile, setProfile, profiles, setProfiles } = context;
  return { profile, setProfile, profiles, setProfiles }
}

export function userTokenProfile() {
  const context = useContext(UpdateContext);
  const { tokenProfile, setTokenProfile } = context;
  return { tokenProfile, setTokenProfile }
}

export function userModal() {
  const context = useContext(UpdateContext);
  const { modalVisible, setModalVisible, modalVisibleCV, setModalVisibleCV } = context;
  return { modalVisible, setModalVisible, modalVisibleCV, setModalVisibleCV }
}

export function userListDashboard() {
  const context = useContext(UpdateContext);
  const { listDashboard, setListDashboard } = context;
  const { groupBy, setGroupBy } = context;
  return { 
    listDashboard, setListDashboard, 
    groupBy, setGroupBy
  }
}

export function userListUser() {
  const context = useContext(UpdateContext);
  const { user, setUser } = context;
  return { user, setUser }
}

export function userCount() {
  const context = useContext(UpdateContext);
  const { count, setCount } = context;
  return { count, setCount }
}