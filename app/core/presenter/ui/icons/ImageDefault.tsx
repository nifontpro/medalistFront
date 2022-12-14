import {FC} from "react";
import {ImageProps} from "next/dist/client/image";
import Image from "next/image";
import defaultImage from '@/core/presenter/images/defSvg.svg'

type ImageDefaultProps = Omit<ImageProps, "src"> & {
	src?: string
}

/*const imageLoader = ({src}: ImageLoaderProps) => {
	return src.split(":")[0] == 'https' ?
		src
		:
		`${BASE_URL}/${src}`
}*/

export const ImageDefault: FC<ImageDefaultProps> = (
	{
		src, alt, layout, draggable, priority,
		width, height, objectFit, className
	}
) => {
	return src ?
		<Image
			className={className}
			src={src}
			alt={alt}
			width={width}
			height={height}
			layout={layout}
			draggable={draggable}
			priority={priority}
			objectFit={objectFit}
			// loader={imageLoader}
		/>
		:
		<Image
			src={defaultImage}
			width={width}
			height={height}
			alt="Default"
			draggable={false}
			layout={layout}
			priority={priority}
			objectFit={objectFit}
		/>
}
