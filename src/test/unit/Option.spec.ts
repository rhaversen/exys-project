// Node.js built-in modules

// Third-party libraries
import { expect } from 'chai'
import { describe, it } from 'mocha'

// Own modules
import OptionModel from '../../app/models/Option.js'

// Setup test environment
import '../testSetup.js'

describe('Option Model', function () {
	let testOptionFields: {
		name: string
		imageURL: string
		price: number
	}

	beforeEach(async function () {
		testOptionFields = {
			name: 'TestOption',
			imageURL: 'https://example.com/image.jpg',
			price: 100
		}
	})

	it('should create a valid order', async function () {
		const option = await OptionModel.create(testOptionFields)
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(option).to.exist
		expect(option.name).to.equal(testOptionFields.name)
		expect(option.imageURL).to.equal(testOptionFields.imageURL)
		expect(option.price).to.equal(testOptionFields.price)
	})

	it('should trim the name', async function () {
		const option = await OptionModel.create({
			...testOptionFields,
			name: '  TestOption  '
		})
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(option).to.exist
		expect(option.name).to.equal('TestOption')
	})

	it('should trim the imageURL', async function () {
		const option = await OptionModel.create({
			...testOptionFields,
			imageURL: '  https://example.com/image.jpg  '
		})
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(option).to.exist
		expect(option.imageURL).to.equal('https://example.com/image.jpg')
	})

	it('should create an option with a non-integer price', async function () {
		const option = await OptionModel.create({
			...testOptionFields,
			price: 100.5
		})
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(option).to.exist
		expect(option.price).to.equal(100.5)
	})

	it('should create an option with no image URL', async function () {
		const option = await OptionModel.create({
			...testOptionFields,
			imageURL: undefined
		})
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(option).to.exist
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(option.imageURL).to.be.undefined
	})

	it('should not create an option with no name', async function () {
		let errorOccurred = false
		try {
			await OptionModel.create({
				...testOptionFields,
				name: undefined
			})
		} catch (err) {
			// The promise was rejected as expected
			errorOccurred = true
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(errorOccurred).to.be.true
	})

	it('should not create an option with no price', async function () {
		let errorOccurred = false
		try {
			await OptionModel.create({
				...testOptionFields,
				price: undefined
			})
		} catch (err) {
			// The promise was rejected as expected
			errorOccurred = true
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(errorOccurred).to.be.true
	})

	it('should create an option with a price of 0', async function () {
		const option = await OptionModel.create({
			...testOptionFields,
			price: 0
		})
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(option).to.exist
		expect(option.price).to.equal(0)
	})

	it('should not create an option with a negative price', async function () {
		let errorOccurred = false
		try {
			await OptionModel.create({
				...testOptionFields,
				price: -1
			})
		} catch (err) {
			// The promise was rejected as expected
			errorOccurred = true
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(errorOccurred).to.be.true
	})

	it('should not create an option with a too long name', async function () {
		let errorOccurred = false
		try {
			await OptionModel.create({
				...testOptionFields,
				name: 'a'.repeat(21)
			})
		} catch (err) {
			// The promise was rejected as expected
			errorOccurred = true
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(errorOccurred).to.be.true
	})
})
