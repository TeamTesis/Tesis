"use"
import { useEffect , useState} from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"
import { getSession } from "next-auth/react";

const ProfileLabel = () => {

  const [session, setSession] = useState(null);

  useEffect(() => {
    (async () => {
      const sessionData = await getSession();
      if (sessionData) {
        setSession(sessionData);
        console.log(sessionData.user.email);
      }
    })();
  }, []);


  return (
    <div className="flex items-center">
      {session && session.user && (
        <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[170px] block">
            {session.user.email}
          </span>
        <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
          <Icon icon="heroicons-outline:chevron-down"></Icon>
        </span>
      </div>
      )}
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const ProfileMenu = [
    {
      label: "Configuracion",
      icon: "heroicons-outline:cog-8-tooth",

      action: () => {
        router.push("/configuracion");
      },
    },
    {
      label: "Agregar usuario",
      icon: "heroicons-outline:user-plus",

      action: () => {
        router.push("/usuarios");
      },
    },
    {
      label: "Logout",
      icon: "heroicons-outline:login",
      action: () => signOut({ redirect: true, callbackUrl: '/' }),
    },
  ];

  return (
    <Dropdown label={ProfileLabel()} classMenuItems="w-[180px] top-[58px]">
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <div
              onClick={() => item.action()}
              className={`${
                active
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                  : "text-slate-600 dark:text-slate-300"
              } block     ${
                item.hasDivider
                  ? "border-t border-slate-100 dark:border-slate-700"
                  : ""
              }`}
            >
              <div className={`block cursor-pointer px-4 py-2`}>
                <div className="flex items-center">
                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="block text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  );
};

export default Profile;
