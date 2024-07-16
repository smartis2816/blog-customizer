import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { OnClick } from 'components/arrow-button/ArrowButton';
import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';
import { Select } from 'components/select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { Text } from 'components/text';

type Props = {
	articleState: ArticleStateType;
	setArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, setArticleState }: Props) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [textColor, setTextColor] = useState(articleState.fontColor);
	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [bgColor, setBgColor] = useState(articleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const formOpenHandler: OnClick = () => {
		setIsOpen(!isOpen);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	const formSubmitHandler = (event: SyntheticEvent) => {
		event.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: textColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
		});
	};

	const formResetHandler = (event: SyntheticEvent) => {
		event.preventDefault();
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={formOpenHandler} isOpenForm={isOpen} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}>
					<Text as='h1' uppercase size={31} weight={800} align={'left'}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={fontFamily}
						title={'Шрифт'}
						onChange={setFontFamily}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={fontSize}
						title={'Размер шрифта'}
						onChange={setFontSize}
					/>
					<Select
						options={fontColors}
						selected={textColor}
						title={'Цвет шрифта'}
						onChange={setTextColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={bgColor}
						onChange={setBgColor}
						title={'Цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
