/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import DynamicSeparatorBlock from './components/edit';
import icons from './components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;

/**
 * Block registration
 */
registerBlockType( 'coblocks/dynamic-separator', {

	title: __( 'Dynamic HR' ),

	description: __( 'Add a resizable spacer between other blocks.' ),

	icon: {
		src: icons.hr,
	},

	category: 'coblocks',

	keywords: [
		__( 'hr' ),
		__( 'separator' ),
		__( 'coblocks' ),
	],

	supports: {
		html: false,
	},

	attributes: {
		height: {
			type: 'number',
			default: 50,
		},
		style: {
			type: 'string',
			default: 'dots',
		},
		color: {
			type: 'string',
		},
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/spacer' ],
				transform: ( { height } ) => (
					createBlock( 'core/spacer', { height: height } )
				),
			},
			{
				type: 'block',
				blocks: [ 'core/separator' ],
				transform: () => createBlock( 'coblocks/dynamic-separator' ),
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/spacer' ],
				transform: ( { height } ) => (
					createBlock( 'core/spacer', { height: height } )
				),
			},
			{
				type: 'block',
				blocks: [ 'core/separator' ],
				transform: () => (
					createBlock( 'core/separator' )
				),
			},
		],
	},

	edit: DynamicSeparatorBlock,

	save( { attributes, className } ) {

		const {
			color,
			height,
			style,
		} = attributes;

		const classes = classnames(
			className,
			style ? `hr-style--${ style }` : `hr-style----dots`,
		);

		// Set the default separator color based on the style selected.
		function defaultSeparatorColor( attributes ) {
			if ( attributes.color ) {
				return attributes.color;
			} else if ( 'line' === attributes.style || 'fullwidth' === attributes.style ) {
				return 'rgba(0, 0, 0, .15)';
			} else {
				return 'rgba(0, 0, 0, .8)';
			}
		}

		return (
			<hr className={ classes } style={ { height: height ? height + 'px' : undefined, color: defaultSeparatorColor( attributes ) } }></hr>
		);
	},
} );
