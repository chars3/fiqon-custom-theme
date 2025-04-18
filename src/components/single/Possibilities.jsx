import React, { useEffect, useState } from "react";

const Possibilities = () => {
  const [activeTab, setActiveTab] = useState("triggers");
  const [appName, setAppName] = useState("");
  const [triggers, setTriggers] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://fiqon.com.br/wp-json/wp/v2/apps?per_page=100");
        const data = await res.json();

        const slug = window.location.pathname.split("/").filter(Boolean).pop();
        const matchingApp = data.find((app) => app.slug === slug);
        if (!matchingApp) return;

        const appTitle =
          matchingApp.acf?.app_title ||
          matchingApp.title?.rendered ||
          "Aplicativo";

        const appTriggers = matchingApp.app_trigger || [];
        const appActions = matchingApp.app_actions || [];

        const appIcon =
          matchingApp.acf?.app_logo?.url || "https://placehold.co/48";

        const formattedTriggers = appTriggers.map((item) => ({
          icon: appIcon,
          title: item.title,
          description: item.description,
          app_name: appTitle,
        }));

        const formattedActions = appActions.map((item) => ({
          icon: appIcon,
          title: item.title,
          description: item.description,
          app_name: appTitle,
        }));

        // Definir tab inicial com base nos dados disponíveis
        if (formattedTriggers.length > 0) {
          setActiveTab("triggers");
        } else if (formattedActions.length > 0) {
          setActiveTab("actions");
        }

        setAppName(appTitle);
        setTriggers(formattedTriggers);
        setActions(formattedActions);
      } catch (error) {
        console.error("Erro ao buscar dados do app:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppData();
  }, []);

  const showTriggers = triggers.length > 0;
  const showActions = actions.length > 0;

  return (
    <div className="text-center">
      <h2 className="text-primary text-[26px] font-bold">
        Veja todas as possibilidades
      </h2>
      <p className="text-text-200 mt-4 text-lg">
        Confira o que é possível fazer unindo{" "}
        <span className="font-bold">{appName}</span> e{" "}
        <span className="font-bold">FiqOn</span>
      </p>

      {/* Tabs */}
      {(showTriggers || showActions) && (
        <div className="relative flex justify-center items-center mt-10 pb-2">
          <div className="absolute w-full h-0.5 bg-dashed border-t border-dashed border-[#008A35]"></div>
          <div
            className={`relative z-10 flex px-2 ${
              showTriggers && showActions
                ? "space-x-4"
                : "justify-center w-full"
            }`}
          >
            {showTriggers && (
              <button
                className={`text-sm md:text-base flex justify-center items-center cursor-pointer px-4 py-2 rounded-xl ${
                  activeTab === "triggers"
                    ? "bg-text-green focus:bg-text-green text-white border-[#008A35] hover:bg-text-green"
                    : "border border-[#018562] bg-white text-[#018562] hover:bg-[#E5F3EA] hover:text-text-green focus:outline-none"
                }`}
                onClick={() => setActiveTab("triggers")}
              >
                GATILHOS {triggers.length}
              </button>
            )}
            {showActions && (
              <button
                className={`text-sm md:text-base flex justify-center items-center cursor-pointer px-4 py-2 rounded-xl ${
                  activeTab === "actions"
                    ? "bg-text-green focus:bg-text-green text-white border-[#008A35] hover:bg-text-green"
                    : "border border-[#018562] bg-white text-[#018562] hover:bg-[#E5F3EA] hover:text-text-green focus:outline-none"
                }`}
                onClick={() => setActiveTab("actions")}
              >
                AÇÕES {actions.length}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-left">
        {loading ? (
          <p className="col-span-3 text-center text-gray-500">Carregando...</p>
        ) : (
          (activeTab === "triggers" ? triggers : actions).map((item, index) => (
            <div
              key={index}
              className="bg-[#F6F6F7] p-4 rounded-lg flex items-center gap-6"
            >
              <div className="flex w-[110px] justify-center items-center">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-[110px] h-[110px] object-contain"
                />
              </div>
              <div className="w-[80%]">
                <p className="text-text-300 font-medium">{item.title}</p>
                <p className="text-text-200 text-sm mt-1">{item.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { Possibilities };
