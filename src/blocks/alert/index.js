/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import edit from './components/edit';
import icons from './components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { RichText, getColorClass } = wp.editor;

/**
 * Block attributes
 */
const blockAttributes = {
	title: {
		type: 'string',
		selector: '.wp-block-coblocks-alert__title',
	},
	value: {
		type: 'array',
		selector: '.wp-block-coblocks-alert__text',
	},
	backgroundColor: {
		type: 'string',
	},
	borderColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	customTitleColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customBorderColor: {
		type: 'string',
	},
	titleColor: {
		type: 'string',
	},
	align: {
		type: 'string',
		default: 'center',
	},
	textAlign: {
		type: 'string',
	},
	type: {
		type: 'string',
		default: 'default',
	},
};

/**
 * Block registration
 */
registerBlockType( 'coblocks/alert', {

	title: __( 'Alert' ),

	description: __( 'Provide contextual feedback messages.' ),

	icon: {
		src: icons.alert,
	},

	category: 'coblocks',

	keywords: [
		__( 'notice' ),
		__( 'message' ),
		__( 'coblocks' ),
	],

	attributes: blockAttributes,

	supports: {
		align: true,
		alignWide: false,
		alignFull: false,
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					return createBlock( 'coblocks/alert', { value: content } );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { value } ) => {
					// transforming an empty alert element
					if ( ! value || ! value.length ) {
						return createBlock( 'core/paragraph' );
					}
					// transforming an alert element with content
					return ( value || [] ).map( item => createBlock( 'core/paragraph', {
						content: value,
					} ) );
				},
			},
		],
	},

	edit: edit,

	save: function( props ) {

		const {
			align,
			backgroundColor,
			borderColor,
			customBackgroundColor,
			customBorderColor,
			customTextColor,
			customTitleColor,
			textAlign,
			textColor,
			title,
			titleColor,
			type,
			value,
		} = props.attributes;

		// Background color class and styles.
		const backgroundClass = getColorClass( 'background-color', backgroundColor );
		const borderClass = getColorClass( 'border-color', borderColor );

		const backgroundClasses = classnames(
			props.className,
			`is-${ type }-alert`,
			`align${ align }`, {
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
			[ borderClass ]: borderClass,
		} );

		const backgroundStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			borderColor: borderClass ? undefined : customBorderColor,
			textAlign: textAlign,
		};

		// Title color class and styles.
		const titleClass = getColorClass( 'color', titleColor );

		const titleClasses = classnames(
			props.className,
			'wp-block-coblocks-alert__title', {
			'has-text-color': titleColor || customTitleColor,
			[ titleClass ]: titleClass,
		} );

		const titleStyles = {
			color: titleClass ? undefined : customTitleColor,
		};

		// Text color class and styles.
		const textClass = getColorClass( 'color', textColor );

		const textClasses = classnames(
			props.className,
			'wp-block-coblocks-alert__text', {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
		} );

		const textStyles = {
			color: textClass ? undefined : customTextColor,
		};

		return (
			<div
				className={ backgroundClasses }
				style={ backgroundStyles }
			>
				{ title && title.length > 0 && (
					<RichText.Content
						tagName="p"
						className={ titleClasses }
						value={ title }
						style={ titleStyles }
					/>
				) }
				{ value && (
					<RichText.Content
						tagName="p"
						className={ textClasses }
						value={ value }
						style={ textStyles }
					/>
				) }
			</div>
		);
	},
} );