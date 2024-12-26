import React, { useEffect, useRef, useState } from "react";

const TeachableMachine: React.FC = () => {
  const [model, setModel] = useState<any>(null);
  const [predictions, setPredictions] = useState([]);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const imageRef = useRef<any>(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const modelURL = "/model/model.json";
    const metadataURL = "/model/metadata.json";

    // Load model
    const loadedModel = await (window as any).tmImage.load(
      modelURL,
      metadataURL,
    );
    console.log('loadedModel', loadedModel)
    setModel(loadedModel);
    setMaxPredictions(loadedModel.getTotalClasses());
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log('handleImageUpload', file)

    reader.onload = async (e: any) => {
      console.log('reader.onload')
      if (imageRef.current) {
        console.log('imageRef.current')
        imageRef.current.src = e.target.result;

        // Wait for image to load
        imageRef.current.onload = async () => {
          console.log('imageRef.current')
          if (model) {
            console.log('model.prediction')
            const prediction = await model.predict(imageRef.current);
            console.log('prediction', prediction)
            setPredictions(
              prediction.sort(
                (a: any, b: any) => b.probability - a.probability,
              ),
            );
          }
        };
      }
    };

    // check if reader has type Blob
    try {
      reader?.readAsDataURL(file);
    } catch (error) {
      
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h2 className="font-bold text-dark dark:text-white">
                Nhận diện bệnh cây cà phê
              </h2>
            </div>
            <div className="p-7">
              <form>
                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border border-dashed border-gray-4 bg-gray-2 px-4 py-4 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary sm:py-7.5"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    name="photo"
                    id="photo"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleImageUpload}
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <span className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4613 2.07827C10.3429 1.94876 10.1755 1.875 10 1.875C9.82453 1.875 9.65714 1.94876 9.53873 2.07827L6.2054 5.7241C5.97248 5.97885 5.99019 6.37419 6.24494 6.6071C6.49969 6.84002 6.89502 6.82232 7.12794 6.56756L9.375 4.10984V13.3333C9.375 13.6785 9.65482 13.9583 10 13.9583C10.3452 13.9583 10.625 13.6785 10.625 13.3333V4.10984L12.8721 6.56756C13.105 6.82232 13.5003 6.84002 13.7551 6.6071C14.0098 6.37419 14.0275 5.97885 13.7946 5.7241L10.4613 2.07827Z"
                          fill="#5750F1"
                        />
                        <path
                          d="M3.125 12.5C3.125 12.1548 2.84518 11.875 2.5 11.875C2.15482 11.875 1.875 12.1548 1.875 12.5V12.5457C1.87498 13.6854 1.87497 14.604 1.9721 15.3265C2.07295 16.0765 2.2887 16.7081 2.79029 17.2097C3.29189 17.7113 3.92345 17.9271 4.67354 18.0279C5.39602 18.125 6.31462 18.125 7.45428 18.125H12.5457C13.6854 18.125 14.604 18.125 15.3265 18.0279C16.0766 17.9271 16.7081 17.7113 17.2097 17.2097C17.7113 16.7081 17.9271 16.0765 18.0279 15.3265C18.125 14.604 18.125 13.6854 18.125 12.5457V12.5C18.125 12.1548 17.8452 11.875 17.5 11.875C17.1548 11.875 16.875 12.1548 16.875 12.5C16.875 13.6962 16.8737 14.5304 16.789 15.1599C16.7068 15.7714 16.5565 16.0952 16.3258 16.3258C16.0952 16.5565 15.7714 16.7068 15.1599 16.789C14.5304 16.8737 13.6962 16.875 12.5 16.875H7.5C6.30382 16.875 5.46956 16.8737 4.8401 16.789C4.22862 16.7068 3.90481 16.5565 3.67418 16.3258C3.44354 16.0952 3.29317 15.7714 3.21096 15.1599C3.12633 14.5304 3.125 13.6962 3.125 12.5Z"
                          fill="#5750F1"
                        />
                      </svg>
                    </span>
                    <p className="mt-2.5 text-body-sm font-medium">
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col items-center justify-between">
                    <img ref={imageRef} />
                  </div>
                  <div className="container mx-auto">
                    <h2 className="mb-4 mt-4 text-2xl font-bold">Kết quả</h2>
                    <ul className="list-none">
                      {predictions.map((prediction: any) => (
                        <li key={prediction.className} className="mb-4">
                          <div className="mb-1 flex justify-between">
                            <h3 className="font-medium text-dark dark:text-white">
                              {prediction.className}
                            </h3>
                            <span className="font-medium text-dark dark:text-white">
                              {(prediction.probability * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2.5 rounded-full bg-primary transition-all duration-300"
                              style={{
                                width: `${prediction.probability * 100}%`,
                              }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeachableMachine;
