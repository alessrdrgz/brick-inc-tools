import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AppPage } from "@/components/app/AppPage";
import { GuidePage } from "@/components/guides/GuidePage";
import { WalkthroughPage } from "@/components/guides/WalkthroughPage";
import { AppShell } from "@/components/layout/AppShell";
import { ConversionsPage } from "@/components/tools/ConversionsPage";
import { PresetsPage } from "@/components/tools/PresetsPage";
import { SciencePage } from "@/components/tools/SciencePage";
import { getFeatures, getResources } from "@/data/guides";

const resourcesByLocale = { es: getResources("es"), en: getResources("en") };
const featuresByLocale = { es: getFeatures("es"), en: getFeatures("en") };

export default function App() {
	return (
		<Router>
			<Routes>
				<Route element={<AppShell />}>
					<Route index element={<Navigate to="/guides/walkthrough" replace />} />
					<Route path="guides" element={<Navigate to="/guides/walkthrough" replace />} />
					<Route path="guides/walkthrough" element={<WalkthroughPage />} />
					<Route path="guides/walkthrough/:step" element={<WalkthroughPage />} />
					<Route
						path="guides/resources"
						element={<GuidePage contentByLocale={resourcesByLocale} />}
					/>
					<Route
						path="guides/features"
						element={<GuidePage contentByLocale={featuresByLocale} />}
					/>
					<Route path="conversions" element={<ConversionsPage />} />
					<Route path="science" element={<SciencePage />} />
					<Route path="presets" element={<PresetsPage />} />
					<Route path="app" element={<AppPage />} />
					<Route path="*" element={<Navigate to="/guides/walkthrough" replace />} />
				</Route>
			</Routes>
		</Router>
	);
}
