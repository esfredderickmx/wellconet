import "filepond/dist/filepond.min.css";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { FilePondServerConfigProps } from "filepond";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface FilepondHandlerProps {
	onChange: (content: string) => void;
	setFilepondError: (error: string | null) => void;
}

export function FilepondHandler({onChange, setFilepondError}: FilepondHandlerProps) {
	const server: FilePondServerConfigProps["server"] = {
		url: route("filepond.process"),
		headers: {
			"X-CSRF-TOKEN": `${document.getElementById("csrf-token")!.getAttribute("content")}`,
		},
		process: {
			url: "/",
			onerror: responseBody => setFilepondError(JSON.parse(responseBody)),
		},
	};

	return (
		<FilePond
			server={server}
			id="filepond_file"
			name="filepond_file"
			allowMultiple={false}
			allowImagePreview={true}
			allowImageExifOrientation={true}
			onprocessfilestart={() => setFilepondError(null)}
			onprocessfiles={() => {
				onChange(document.querySelector("input[name=\"filepond_file\"]")!.getAttribute("value")!);
			}}
			onremovefile={() => {
				onChange("");
				setFilepondError(null);
			}}
			labelIdle={`Arrastra aquí tus archivos o <span class="filepond--label-action">Examina</span>`}
			labelFileProcessingComplete="Subida completada"
			labelFileProcessing="Cargando"
			labelTapToCancel="clic para cancelar"
			labelTapToUndo="clic para deshacer"
			labelFileProcessingError="Error al subir"
			labelTapToRetry="clic para reintentar"
		/>
	);
}