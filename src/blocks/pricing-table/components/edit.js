/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { RichText, UrlInput } = wp.editor;
const { Dashicon, IconButton } = wp.components;

/**
 * Block edit function
 */
export default class PricingTableBlock extends Component {

	constructor() {
		super( ...arguments );

		this.onFocusButton = this.onFocusButton.bind( this );
		this.offFocusButton = this.offFocusButton.bind( this );
		this.onFocusButton_2 = this.onFocusButton_2.bind( this );

		this.state = {
			buttonFocused: false,
			buttonFocused_2: false,
		};
	}

	componentDidUpdate( prevProps ) {
		if ( ! this.props.isSelected && prevProps.isSelected && this.state.buttonFocused && this.state.buttonFocused_2 ) {
			this.setState( {
				buttonFocused: false,
				buttonFocused_2: false,
			} );
		}
	}

	onFocusButton() {
		if ( ! this.state.buttonFocused ) {
			this.setState( {
				buttonFocused: true,
				buttonFocused_2: false,
			} );
		}
	}

	onFocusButton_2() {
		if ( ! this.state.buttonFocused_2 ) {
			this.setState( {
				buttonFocused: false,
				buttonFocused_2: true,
			} );
		}
	}

	offFocusButton() {
		if ( this.state.buttonFocused || this.state.buttonFocused_2 ) {
			this.setState( {
				buttonFocused: false,
				buttonFocused_2: false,
			} );
		}
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			setState,
			setAttributes,
			toggleSelection,
		} = this.props;

		const {
			align,
			amount,
			amount_2,
			button,
			button_2,
			buttonBackground,
			buttonColor,
			columns,
			currency,
			currency_2,
			features,
			features_2,
			layout,
			tableBackground,
			tableColor,
			title,
			title_2,
			url,
			url_2,
		} = attributes;

		const formattingControls = [ 'bold', 'italic', 'strikethrough' ];

		return [
			isSelected && (
				<Controls
					{ ...this.props }
				/>
			),
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),

			<div className={ className + ' pricing-table pricing-table--' + columns + ' pricing-table--' + align } style={ { textAlign: align } }>

				<div className={ 'pricing-table__item pricing-table__item--1' } style={ { backgroundColor: tableBackground } }>

					<RichText
						tagName="h4"
						className={ 'pricing-table__title' }
						onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
						unstableOnFocus={ this.offFocusButton }
						style={ { color: tableColor } }
						value={ title }
						placeholder={ __( 'Plan A' ) }
						formattingControls={ formattingControls }
						keepPlaceholderOnFocus
					/>

					<div className={ 'pricing-table__price' }>

						<RichText
							tagName='span'
							className={ 'pricing-table__currency' }
							onChange={ ( nextCurrency ) => setAttributes( { currency: nextCurrency } ) }
							unstableOnFocus={ this.offFocusButton }
							style={ { color: tableColor } }
							value={ currency }
							placeholder={ __( '$' ) }
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>

						<RichText
							tagName='h5'
							className={ 'pricing-table__amount' }
							onChange={ ( nextAmount ) => setAttributes( { amount: nextAmount } ) }
							unstableOnFocus={ this.offFocusButton }
							style={ { color: tableColor } }
							value={ amount }
							placeholder={ __( '99' ) }
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>

					</div>

					<RichText
						tagName='ul'
						multiline='li'
						className={ 'pricing-table__features' }
						onChange={ ( nextFeatures ) => setAttributes( { features: nextFeatures } ) }
						unstableOnFocus={ this.offFocusButton }
						value={ features }
						style={ { color: tableColor } }
						placeholder={ __( 'Add features' ) }
						keepPlaceholderOnFocus
					/>

					{ ( ( button && button.length > 0 ) || isSelected ) && (
						<span className={ 'wp-block-button' } title={ button }>
							<RichText
								tagName='span'
								className="pricing-table__button wp-block-button__link"
								onChange={ ( nextButton ) => setAttributes( { button: nextButton } ) }
								unstableOnFocus={ this.onFocusButton }
								value={ button }
								placeholder={ __( 'Buy Now' ) }
								style={ {
									backgroundColor: buttonBackground,
									color: buttonColor,
								} }
								formattingControls={ formattingControls }
								keepPlaceholderOnFocus
							/>
						</span>
					) }

				</div>

				{ ( columns >= 2 ) && (

					<div className={ 'pricing-table__item pricing-table__item--2' } style={ { backgroundColor: tableBackground } }>

						<RichText
							tagName="h4"
							multiline="false"
							className={ 'pricing-table__title' }
							onChange={ ( nextTitle ) => setAttributes( { title_2: nextTitle } ) }
							unstableOnFocus={ this.offFocusButton }
							style={ { color: tableColor } }
							value={ title_2 }
							placeholder={ __( 'Plan B' ) }
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>

						<div className={ 'pricing-table__price' }>

							<RichText
								tagName='span'
								className={ 'pricing-table__currency' }
								onChange={ ( nextCurrency ) => setAttributes( { currency_2: nextCurrency } ) }
								unstableOnFocus={ this.offFocusButton }
								style={ { color: tableColor } }
								value={ currency_2 }
								placeholder={ __( '$' ) }
								formattingControls={ formattingControls }
								keepPlaceholderOnFocus
							/>

							<RichText
								tagName='h5'
								className={ 'pricing-table__amount' }
								onChange={ ( nextAmount ) => setAttributes( { amount_2: nextAmount } ) }
								unstableOnFocus={ this.offFocusButton }
								style={ { color: tableColor } }
								value={ amount_2 }
								placeholder={ __( '99' ) }
								formattingControls={ formattingControls }
								keepPlaceholderOnFocus
							/>

						</div>

						<RichText
							tagName='ul'
							multiline='li'
							className={ 'pricing-table__features' }
							onChange={ ( nextFeatures ) => setAttributes( { features_2: nextFeatures } ) }
							unstableOnFocus={ this.offFocusButton }
							value={ features_2 }
							style={ { color: tableColor } }
							placeholder={ __( 'Add features' ) }
							keepPlaceholderOnFocus
						/>

						{ ( ( button_2 && button_2.length > 0 ) || isSelected ) && (
							<span className={ 'wp-block-button' } title={ button_2 }>
								<RichText
									tagName='span'
									className="pricing-table__button wp-block-button__link"
									onChange={ ( nextButton ) => setAttributes( { button_2: nextButton } ) }
									unstableOnFocus={ this.onFocusButton_2 }
									value={ button_2 }
									placeholder={ __( 'Buy Now' ) }
									style={ {
										backgroundColor: buttonBackground,
										color: buttonColor,
									} }
									formattingControls={ formattingControls }
									keepPlaceholderOnFocus
								/>
							</span>
						) }

					</div>
				) }

			</div>,
			this.state.buttonFocused && isSelected && (
				<form
					className="core-blocks-button__inline-link"
					onSubmit={ ( event ) => event.preventDefault() }
				>
					<Dashicon icon="admin-links" />
					<div>
						<UrlInput
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
						/>
					</div>
					<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
				</form>
			),
			this.state.buttonFocused_2 && columns >= 2 && isSelected && (
				<form
					className="core-blocks-button__inline-link"
					onSubmit={ ( event ) => event.preventDefault() }
				>
					<Dashicon icon="admin-links" />
					<div>
						<UrlInput
							value={ url_2 }
							onChange={ ( value ) => setAttributes( { url_2: value } ) }
						/>
					</div>
					<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
				</form>
			)
		];
	}
};