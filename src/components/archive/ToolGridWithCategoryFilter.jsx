import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const ToolGridWithCategoryFilter = ({ searchQuery }) => {
    const [categories, setCategories] = useState([]);
    const [tools, setTools] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    // Buscar categorias
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://fiqon-backup.local/wp-json/wp/v2/app-category");
                const data = await res.json();
                setCategories([{ id: null, name: "Todas" }, ...data]);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };
        fetchCategories();
    }, []);

    // Buscar ferramentas filtradas por categoria e busca
    useEffect(() => {
        const fetchTools = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://fiqon-backup.local/wp-json/wp/v2/apps");
                const data = await res.json();

                let filteredTools = data;

                console.log(filteredTools)

                if (selectedCategory) {
                    filteredTools = filteredTools.filter(app =>
                        app["app-category"] && app["app-category"].includes(selectedCategory)
                    );
                }

                // Aplicar filtro de busca, garantindo que title seja uma string válida
                if (searchQuery) {
                    filteredTools = filteredTools.filter(tool => {
                        const appTitle = tool.acf?.app_title || "";
                        const appName = tool.title?.rendered || ""; 

                        return (
                            appTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            appName.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    });
                }

                setTools(filteredTools);
            } catch (error) {
                console.error("Erro ao buscar ferramentas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTools();
    }, [selectedCategory, searchQuery]);

    return (
        <div className="flex gap-4">
            {/* Filtro de Categoria */}
            <div className="p-4 w-1/4">
                <h3 className="text-gray-600 font-semibold mb-2 border-b pb-2">POR CATEGORIA</h3>
                <div className="px-2">
                    <ul className="space-y-2">
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex justify-between items-center text-gray-700 cursor-pointer hover:text-green-600 ${
                                    selectedCategory === category.id ? "text-green-600 font-bold" : ""
                                }`}
                            >
                                <span>{category.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* Grid de Ferramentas */}
            <div className="flex flex-col w-3/4">
                <div className="grid grid-cols-5 gap-4 p-4 w-full">
                    {loading ? (
                        <p className="col-span-5 text-center">Carregando ferramentas...</p>
                    ) : tools.length > 0 ? (
                        tools.map((tool, index) => (
                            <div key={index} className="text-center p-2">
                                <img
                                    src={tool.acf?.app_logo?.url || "https://placehold.co/122"}
                                    alt={tool.acf?.app_title || tool.title?.rendered || "Ferramenta"}
                                    className="w-[122px] h-[122px] mx-auto"
                                />
                                <p className="mt-2">{tool.acf?.app_title || tool.title?.rendered}</p>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-5 text-center">Nenhuma ferramenta encontrada</p>
                    )}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                    <p className="font-bold text-gray-800">Não encontrou a ferramenta que procura?</p>
                    <p className="text-gray-600 text-sm mt-1">
                        Lorem ipsum dolor sit amet consectetur. Dictumst sit mattis risus leo risus cras.
                    </p>
                    <a
                        href="https://doc.clickup.com/31083618/d/h/xmk32-86893/760bc715a491aac"
                        className="text-green-600 font-semibold flex items-center mt-2"
                        target="_blank"
                    >
                        Conectar ferramenta <ArrowRight className="ml-2" size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ToolGridWithCategoryFilter;
