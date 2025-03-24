import Downsampling from './Downsampling';
import m from './Downsampling.mock';

describe('testing downsampling functionality', () => {
    test('with clean constructor downsamplingRate == 0 and should pass through all the messages', () => {
        const ds = new Downsampling()
        const outputList = m.aisObjList.filter((aisObj) => ds.sampling(aisObj));
        expect(outputList.length).toEqual(m.aisObjList.length);
    });

    describe('with downsamplingRate == 2 second should sample all the message type (1,2,3)', () => {
        let ds: Downsampling;
        const RealDate = Date.now;
        beforeEach(() => {
            Date.now = jest.fn(() => new Date(2022, 1, 2, 10, 10, 10).getTime());
            ds = new Downsampling(2)
        });
        afterAll(() => {
            Date.now = RealDate;
        })

        test('pass all the aisObj list and pass before 2s the first obj. Should return outputList length -1.', () => {
            const outputList = m.aisObjList.filter((aisObj) => ds.sampling(aisObj));
            if (ds.sampling(m.aisObjList[0])) {
                outputList.push(m.aisObjList[0]);
            }
            expect(outputList.length).toEqual(m.aisObjList.length);
        });

        test('pass all the aisObj list and pass after 2s the first obj. Should return outputList length +1.', async () => {
            const outputList = m.aisObjList.filter((aisObj) => ds.sampling(aisObj));
            Date.now = jest.fn(() => new Date(2022, 1, 2, 10, 10, 12).getTime());
            if (ds.sampling(m.aisObjList[0])) {
                outputList.push(m.aisObjList[0]);
            }
            expect(outputList.length).toEqual(m.aisObjList.length + 1);
        });
    });
});
