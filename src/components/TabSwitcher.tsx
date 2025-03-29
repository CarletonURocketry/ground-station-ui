interface TabSwitcherProps {
	activeTab: string;
	tabs: { id: string; label: string }[];
	onTabChange: (tabId: string) => void;
}

function TabSwitcher({ activeTab, tabs, onTabChange }: TabSwitcherProps) {
	return (
		<div className="flex mb-6">
			{tabs.map((tab) => (
				<button
					type="button"
					key={tab.id}
					className={`px-6 py-2 text-sm font-medium border-b-2 transition-colors ${
						activeTab === tab.id
							? "border-blue-600 text-blue-600"
							: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
					}`}
					onClick={() => onTabChange(tab.id)}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}

export default TabSwitcher;
