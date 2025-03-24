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
        const res = await fetch("http://fiqon-backup.local/wp-json/wp/v2/apps");
        const data = await res.json();

        console.log("Dados retornados:", data);

        // Captura o slug da URL atual
        const slug = window.location.pathname.split("/").filter(Boolean).pop();

        console.log("Slug atual:", slug);

        // Encontra o app correspondente
        const matchingApp = data.find((app) => app.slug === slug);

        console.log("Aplicativo correspondente:", matchingApp);

        if (!matchingApp) {
          console.warn(
            "Nenhum app correspondente encontrado para o slug:",
            slug
          );
          return;
        }

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

        console.log(formattedActions);

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

  return (
    <div className="text-center">
      <h2 className="text-green-600 text-2xl font-bold">
        Veja todas as possibilidades
      </h2>
      <p className="text-gray-700 mt-2">
        Confira o que é possível fazer unindo{" "}
        <span className="font-bold">{appName}</span> e FiqOn
      </p>

      {/* Tabs */}
      <div className="relative flex justify-center items-center mt-4 pb-2">
        <div className="absolute w-full h-0.5 bg-dashed border-t border-dashed border-green-600"></div>
        <div className="relative z-10 flex space-x-4 px-2">
          <button
            className={`cursor-pointer px-4 py-1 rounded-full ${
              activeTab === "triggers"
                ? "bg-green-600 text-white"
                : "border border-gray-300 bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab("triggers")}
          >
            GATILHOS {triggers.length}
          </button>
          <button
            className={`cursor-pointer px-4 py-1 rounded-full ${
              activeTab === "actions"
                ? "bg-green-600 text-white"
                : "border border-gray-300 bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab("actions")}
          >
            AÇÕES {actions.length}
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6 text-left">
        {loading ? (
          <p className="col-span-3 text-center text-gray-500">Carregando...</p>
        ) : (
          (activeTab === "triggers" ? triggers : actions).map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg flex">
              <div className="flex w-[100px] justify-center items-center">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-[100px] h-[100px] object-contain"
                />
              </div>
              <div className="w-[80%]">
                <p className="text-gray-800 font-semibold">{item.title}</p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { Possibilities };
